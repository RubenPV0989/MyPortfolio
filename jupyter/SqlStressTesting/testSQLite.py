import sqlite3
import pandas as pd
import datetime
import os

report_path = '' #place where you want to save your report 
db_path = '' #points to your sqlite file
conn = sqlite3.connect(db_path)
cur = conn.cursor()
for x in range(1,60): #insert columns
    columns = str(['field_'+str(x) for x in range(0,x)]).lstrip('[').rstrip(']')
    create_table_query = f'CREATE TABLE main({columns})'
    cur.execute(create_table_query)
    for y in range(1,50): #insert rows
        values = columns.replace("'",'"')
        ops = list(['INSERT', 'SELECT'])
        for op in ops: #switch between INSERT / SELECT
            if op == 'INSERT':                
                query = f'INSERT INTO main ({columns}) VALUES ({values});'*(y*100)
            else:
                query = 'SELECT * FROM main'
            start_op = datetime.datetime.now()
            cur.executescript(query)
            finish_op = datetime.datetime.now()
            op_diff = (finish_op - start_op).total_seconds()
            rows = cur.execute('SELECT COUNT(*) FROM main').fetchone()[0]
            file_stats = os.stat(db_path)
            evaluation = pd.DataFrame({'cols':[x], 'rows' : [rows], 'inserted_rows':[y*100], 'start_op' : [start_op], 'end_op' : [finish_op], 'time_diff': [op_diff], 'operation':[op], 'file_size(KB)': file_stats.st_size/1024})
            if not os.path.exists(report_path):
                evaluation.to_csv(report_path, mode='a', index=False, header=True)
            else:
                evaluation.to_csv(report_path, mode='a', index=False, header=False)      
    cur.execute('DROP TABLE main')
conn.close()