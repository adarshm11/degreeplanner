from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from bs4 import BeautifulSoup
import requests
import time
import json

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
    
    results = []
    soup = BeautifulSoup(response.text, 'html.parser')
    table = soup.find('table')
    trs = table.find_all('tr')
    for tr in trs:
        tds = tr.find_all('td')
        for td in tds:
            if td.get('colspan') == '2':
                text = td.find('p')
                if text:
                    results.append(text.get_text(strip=True))
    
    return results

def umn_scrape():
    url = catalogs['UMN']
    
    try:
        driver = webdriver.Chrome()
        driver.get(url)
        time.sleep(2)
        option = driver.find_element(By.TAG_NAME, 'select')
        select = Select(option)
        select.select_by_visible_text('Undergraduate')
        time.sleep(2)
        page = driver.page_source

    except:
        print('Error encountered')
    
    finally:
        driver.quit()

    results = []
    soup = BeautifulSoup(page, 'html.parser')
    table = soup.find('div', class_='program-list')
    programs = table.find_all('div', class_='program')
    for program in programs:
        details = program.find('div', class_='program__details')
        type = details.find('div', class_='program__type')
        for b in type.find_all('b'):
            b.extract()
        program_type = type.get_text(strip=True) #bachelors, minors, etc
        if program_type == 'Bachelors':
            program_title = program.find('h3')
            major_name = program_title.get_text(strip=True)
            results.append(major_name)

    return results

sjsu_majors = sjsu_scrape()
ucsc_majors = ucsc_scrape()
umn_majors = umn_scrape()

with open('../frontend/src/majors/sjsu_majors.json', 'w') as file:
    json.dump(sjsu_majors, file)

with open('../frontend/src/majors/ucsc_majors.json', 'w') as file:
    json.dump(ucsc_majors, file)

with open ('../frontend/src/majors/umn_majors.json', 'w') as file:
    json.dump(umn_majors, file)
