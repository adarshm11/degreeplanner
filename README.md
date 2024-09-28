# Degree Planner

A customizable degree planning tool designed to help students track degree requirements and plan their academic paths. The project currently supports Computer Science (CS) majors across multiple universities and allows users to interact with a user-friendly interface to obtain the most up-to-date degree requirements.

## Features

- **Customizable Menu**: Users can select their university and major from a dropdown menu (currently supporting SJSU, UMN, and UCSC for CS majors).
- **Dynamic Degree Requirements**: Degree requirements are obtained by scraping academic catalogs from university websites using Selenium, BeautifulSoup, and Playwright.
- **Year-Specific Roadmaps**: Based on the user’s input of their starting year in college, the tool ensures the correct academic catalog and roadmap are used.
- **General Education (GE) Suggestions**: The tool provides suggestions for GE requirements based on the selected university.
- **Manual Grade Entry**: Users can input their completed courses and grades, allowing for personalized tracking.
- **Customizable Unit Cap**: Users can set a preferred unit cap (e.g., 15 units per term), and the planner will suggest courses accordingly.
- **Future Features**:
  - **Technical GPA Calculator**: Automatically calculate your technical GPA using a formula consistent across universities.
  - **Expanded Major Support**: Additional majors and universities will be supported in future versions.

## How It Works

1. **Select University and Major**: Use the dropdown menu (HTML/JS) to select your college and major.
2. **Scrape Degree Requirements**: The tool automatically scrapes the latest academic catalog from your university’s website based on your starting year.
3. **Enter Your Information**: Manually input your courses, grades, and first year of college to personalize the planner.
4. **Get Course Suggestions**: Based on your major, the tool will suggest courses, ensuring you meet both major and GE requirements while staying within your unit cap.

## Technologies Used

- **Frontend**: HTML, JavaScript (Dropdown Menu)
- **Web Scraping**: Selenium, BeautifulSoup, Playwright
- **Backend (Future Integration)**: Flask/Django (for GPA calculations, data storage, etc.)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/degree-planner.git

2. Install required Python libraries

   pip install -r requirements.txt

3. Run the web application

   python app.py