import concurrent.futures
import os
import re
import sys
import pandas as pd
from bs4 import BeautifulSoup
from selenium import webdriver

PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))
DRIVER_BIN = os.path.join(PROJECT_ROOT, "chromedriver")
option = webdriver.ChromeOptions()
option.add_argument('headless')

def album_art(song_name):
    success = 0
    fail = 0
    try:
        song_name = song_name.replace(" ", "+")
        url = "https://www.bing.com/images/search?q=" + song_name + "&qs=MM&form=QBILPG&sp=1&pq=state+of+grace+tau&sc=8-18&cvid=6B091F9B39314A91B4960D6158ECB55D&first=1&scenario=ImageBasicHover"
        driver = webdriver.Chrome(executable_path=DRIVER_BIN, options=option)
        driver.get(url)
        res = driver.execute_script("return document.documentElement.outerHTML")
        soup = BeautifulSoup(res, 'lxml')
        main_container = soup.find("img", {"class": "mimg"})
        # print(main_container["src"])
        image_id = main_container['src']
        success += 1
        print("success for: ", song_name)
        driver.quit()
        print(image_id)
        return image_id
    
    except:
        fail += 1
        
        return "no_img"
    

album_art("faded alan walker")