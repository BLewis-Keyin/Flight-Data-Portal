import os
import psycopg2
from psycopg2 import sql

# Connect to the PostgreSQL database
conn = psycopg2.connect(dbname="images", user="postgres", password="admin", host="24.137.80.247", port="5434")
cursor = conn.cursor()

# Create tables if they don't exist
cursor.execute("""
    CREATE TABLE IF NOT EXISTS dogs (
        id SERIAL PRIMARY KEY,
        breed VARCHAR(255),
        imagepath TEXT
    );
""")
conn.commit()

# Walk through the dataset folders and insert data into the tables
dataset_path = r"C:\Users\Ziggy\Desktop\StanfordDS_Dog_Breed\Images"
for breed_name_with_prefix in os.listdir(dataset_path):
    breed_folder = os.path.join(dataset_path, breed_name_with_prefix)
    
    # Extract the breed name without the prefix
    breed_name = breed_name_with_prefix.split('-')[1]
    
    # Check if the breed already exists
    cursor.execute(sql.SQL("SELECT COUNT(*) FROM dogs WHERE breed = {};").format(sql.Literal(breed_name)))
    count = cursor.fetchone()[0]
    
    if count == 0:
        for image_filename in os.listdir(breed_folder):
            image_path = os.path.join(breed_folder, image_filename)
            cursor.execute(sql.SQL("INSERT INTO dogs (breed, imagepath) VALUES ({}, {});").format(sql.Literal(breed_name), sql.Literal(image_path)))

conn.commit()

# Close the database connection
cursor.close()
conn.close()