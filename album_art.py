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
    song_name = song_name.replace(" ", "+")
    url = "https://www.google.com/search?q=" + song_name + "&tbm=isch"
    driver = webdriver.Chrome(executable_path=DRIVER_BIN, options=option)
    driver.get(url)
    res = driver.execute_script("return document.documentElement.outerHTML")
    soup = BeautifulSoup(res, 'lxml')
    main_container = soup.find("img", {"class": "rg_i Q4LuWd"})

    with open("art.txt", 'r+') as f:
        f.truncate(0)
        f.write(main_container['src'])
    f.close()

album_art("faded alan walker")