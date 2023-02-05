import pyodbc
import pandas as pd
import datetime
import os


report_path = '' #place where do you want to save the report

cnxn = pyodbc.connect('') # place your connection string
cursor = cnxn.cursor()

for x in range(1,60): #insert columns 
    columns_def = str(['field_'+str(x) + ' varchar(10)' for x in range(0,x)]).lstrip('[').rstrip(']').replace("'", "")
    columns = str(['field_'+str(x) for x in range(0,x)]).lstrip('[').rstrip(']').replace("'", "")
    values_tuple = tuple('field_'+str(x) for x in range(0,x))

    create_table_query = 'CREATE TABLE python_test.dbo.main({});'.format(columns_def)
    cursor.execute(create_table_query)
    for y in range(1,50): #insert rows 
        ops = list(['INSERT', 'SELECT'])
        for op in ops: #switch between INSERT / SELECT
            if op == 'INSERT':  
                params = [values_tuple for x in range (y*100)]
                param_num = str('?,' * len(values_tuple)).rstrip(',')
                query = f'INSERT INTO python_test.dbo.main ({columns}) VALUES ({param_num});'
                start_op = datetime.datetime.now()
                cursor.executemany(query, params)
                finish_op = datetime.datetime.now()
                
            else:
                query = 'SELECT * FROM python_test.dbo.main'
                start_op = datetime.datetime.now()
                cursor.execute(query)
                finish_op = datetime.datetime.now()

            op_diff = (finish_op - start_op).total_seconds()
            rows = cursor.execute('SELECT COUNT(*) FROM python_test.dbo.main').fetchone()[0]
            evaluation = pd.DataFrame({'cols':[x], 'rows' : [rows], 'inserted_rows':[y*100], 'start_op' : [start_op], 'end_op' : [finish_op], 'time_diff': [op_diff], 'operation':[op]})
            if not os.path.exists(report_path):
                evaluation.to_csv(report_path, mode='a', index=False, header=True)
            else:
                evaluation.to_csv(report_path, mode='a', index=False, header=False)      
    cursor.execute('DROP TABLE python_test.dbo.main')
cursor.close()