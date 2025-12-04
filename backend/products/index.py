import json
import os
from typing import Dict, Any, Optional
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    """Создает подключение к базе данных"""
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn, cursor_factory=RealDictCursor)

def serialize_product(product: Dict[str, Any]) -> Dict[str, Any]:
    """Конвертирует объект продукта в JSON-сериализуемый формат"""
    if product.get('price'):
        product['price'] = float(product['price'])
    if product.get('created_at') and isinstance(product['created_at'], datetime):
        product['created_at'] = product['created_at'].isoformat()
    if product.get('updated_at') and isinstance(product['updated_at'], datetime):
        product['updated_at'] = product['updated_at'].isoformat()
    return product

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    API для управления товарами интернет-магазина.
    Поддерживает получение списка товаров, добавление, редактирование и удаление.
    """
    method: str = event.get('httpMethod', 'GET')
    
    # Обработка CORS preflight
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    
    try:
        if method == 'GET':
            # Получение списка товаров
            params = event.get('queryStringParameters') or {}
            category = params.get('category')
            
            cursor = conn.cursor()
            if category:
                cursor.execute(
                    "SELECT * FROM products WHERE category = %s AND in_stock = true ORDER BY id",
                    (category,)
                )
            else:
                cursor.execute("SELECT * FROM products ORDER BY id")
            
            products = cursor.fetchall()
            cursor.close()
            
            # Сериализуем продукты
            products = [serialize_product(dict(p)) for p in products]
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'products': products}, ensure_ascii=False),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            # Добавление нового товара
            body_data = json.loads(event.get('body', '{}'))
            
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO products (name, description, price, discount, category, article, unit, image_url, in_stock)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING *
            """, (
                body_data['name'],
                body_data.get('description', ''),
                body_data['price'],
                body_data.get('discount', 0),
                body_data['category'],
                body_data['article'],
                body_data['unit'],
                body_data.get('image_url', ''),
                body_data.get('in_stock', True)
            ))
            
            new_product = cursor.fetchone()
            conn.commit()
            cursor.close()
            
            new_product = serialize_product(dict(new_product))
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'product': new_product}, ensure_ascii=False),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            # Обновление товара
            path_params = event.get('pathParams') or {}
            product_id = path_params.get('id')
            
            if not product_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Product ID is required'}),
                    'isBase64Encoded': False
                }
            
            body_data = json.loads(event.get('body', '{}'))
            
            cursor = conn.cursor()
            cursor.execute("""
                UPDATE products 
                SET name = %s, description = %s, price = %s, discount = %s, 
                    category = %s, unit = %s, image_url = %s, in_stock = %s,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = %s
                RETURNING *
            """, (
                body_data['name'],
                body_data.get('description', ''),
                body_data['price'],
                body_data.get('discount', 0),
                body_data['category'],
                body_data['unit'],
                body_data.get('image_url', ''),
                body_data.get('in_stock', True),
                product_id
            ))
            
            updated_product = cursor.fetchone()
            conn.commit()
            cursor.close()
            
            if not updated_product:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Product not found'}),
                    'isBase64Encoded': False
                }
            
            updated_product = serialize_product(dict(updated_product))
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'product': updated_product}, ensure_ascii=False),
                'isBase64Encoded': False
            }
        
        elif method == 'DELETE':
            # Удаление товара
            path_params = event.get('pathParams') or {}
            product_id = path_params.get('id')
            
            if not product_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Product ID is required'}),
                    'isBase64Encoded': False
                }
            
            cursor = conn.cursor()
            cursor.execute("DELETE FROM products WHERE id = %s RETURNING id", (product_id,))
            deleted = cursor.fetchone()
            conn.commit()
            cursor.close()
            
            if not deleted:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Product not found'}),
                    'isBase64Encoded': False
                }
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'message': 'Product deleted successfully'}),
                'isBase64Encoded': False
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Method not allowed'}),
                'isBase64Encoded': False
            }
    
    finally:
        conn.close()