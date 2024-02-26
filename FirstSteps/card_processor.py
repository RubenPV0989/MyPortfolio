#Environment prepare -----------------------------------------------------
#-------------------------------------------------------------------------
import os
import random 
import csv 
import sys

from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

#Project level variables -----------------------------------------------------
#-----------------------------------------------------------------------------
project = sys.argv[1] 

images = [os.path.join(project,'img',img) for img in os.listdir(os.path.join(project,'img'))]
data_source = open(os.path.join(project,'data','data.csv'), "r", encoding = 'utf-8')
csv_reader = csv.reader(data_source)
recipients = [tuple(recipient) for recipient in csv_reader][1:]
data_source.close()

image_settings_source = open(os.path.join(project,'config','card_config.txt'), "r", encoding = 'utf-8')
image_settings = eval(image_settings_source.read())
image_settings_source.close()

message_source = open(os.path.join(project,'config','message.txt'), "r", encoding = 'utf-8')
message = message_source.readlines()
message_source.close()

email_settings_source = open(os.path.join(project,'config','email_config.txt'), "r", encoding = 'utf-8')
email_settings = eval(email_settings_source.read())
email_settings_source.close()

#Process cards -----------------------------------------------------
#-------------------------------------------------------------------
for recipient in recipients:
    img = images[random.randint(0,len(images)-1)]
    img_name = img.split('\\')[-1]
    RGB_val = image_settings[img_name]['font_color']
    start_point_width = image_settings[img_name]['initial_width']
    start_point_height = 140 #hardcoded for now
    greeting = f'Dear {recipient[0]},'
    filename = os.path.join(project,'out',recipient[0]+'.pdf')
    
    letter = canvas.Canvas(filename)
    pdfmetrics.registerFont(TTFont('Edwardian', 'ITCEDSCR.ttf'))
    
    letter.setPageSize((230, 180))
    letter.drawImage(img,0,0, 230, 180)
    letter.setFillColorRGB(RGB_val[0], RGB_val[1], RGB_val[2])
    letter.setFont('Edwardian', 20)
    letter.drawString(start_point_width, 160, greeting)
        
    height = start_point_height
    letter.setFont('Edwardian', 13)
    for phrase in message:
        phrase = phrase.strip()
        letter.drawString(start_point_width, height, phrase)
        height = height - 15
    letter.save()
