#from selenium import webdriver
#from selenium.webdriver.common.keys import Keys
#from selenium.webdriver.common.by import By
import time
import datetime
from bs4 import BeautifulSoup
import requests

catalogs = {
    'SJSU': 'https://catalog.sjsu.edu/content.php?catoid=15&navoid=5383',
    'UCSC': 'https://registrar.ucsc.edu/enrollment/majors-list.html',
    'UMN': 'https://twin-cities.umn.edu/academics-admissions/majors-programs'
}


def sjsu_scrape():
    url = catalogs['SJSU']
    response = requests.get(url)
    if response.status_code != 200:
        print('Failed to retrieve the webpage.')
        return None
    
    soup = BeautifulSoup(response.text, 'html.parser')
    start = soup.find(string='Undergraduate Major(s)')
    end = soup.find(string='Undergraduate Minor(s)')
    results = []
    curr = start.find_next()
    while curr and curr.get_text() != end:
        if curr.name == 'ul':
            for li in curr.find_all('li'):
                course = li.find('a')
                if course:
                    results.append(course.get_text(strip=True))
        curr = curr.find_next_sibling()
    return results

def ucsc_scrape():
    url = catalogs['UCSC']
    response = requests.get(url)
    if response.status_code != 200:
        print('Failed to retrieve the webpage.')
        return None
    
    soup = BeautifulSoup(response.text, 'html.parser')
    start = soup.find('table')
    

def umn_majors():
    pass


#sjsu_majors = sjsu_scrape()
ucsc_scrape()