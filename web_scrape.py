from urllib.request import urlopen

url = "https://catalog.sjsu.edu/preview_program.php?catoid=15&poid=9497&returnto=5383"
page = urlopen(url)
html_flow = page.read()
html = html_flow.decode("utf-8") # string rendering of the entire HTML code

start_index = html.find("<title>") + len("<title>")
end_index = html.find("</title>")
print(html[start_index:end_index])

# from here, interpret the classes, descriptions, and requirements based on their HTML tags