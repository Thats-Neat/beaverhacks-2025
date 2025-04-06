const domain = window.location.origin;
const current_page = window.location.pathname;
let options = {
    get_grades: true,
    get_assignments: true
};

async function fetchData(url) {
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    let data = await response.json();
    
    return data;
}

async function fetchDataHTML(url) {
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'text/html',
            'Accept': 'text/html'
        }
    });

    let data = await response.text();

    
    return data;
}

function isCanvas() {
    // shouldn't be just oregonstate
    if (domain === "https://canvas.oregonstate.edu") {
        return true;
    }
    return false;
}

async function getGrades() {
    let gradeInfo = [];

    if (options.get_grades === true && isCanvas()) {
        let grades = await fetchData(`${domain}/api/v1/courses?include[]=concluded&include[]=total_scores&include[]=computed_current_score&per_page=100`);
        try {
            for (let i = 0; i < grades.length; i++) {
                if (!grades[i]["name"] || grades[i].concluded) {
                    continue;
                }
                if (grades[i].enrollments?.[0]?.computed_current_score) {
                    gradeInfo.push(grades[i]["name"] + " this class has a grade on a normal university grading scale of, " + grades[i].enrollments[0].computed_current_score + "%");
                }
                else {
                    gradeInfo.push(grades[i]["name"] + " doesn't yet have a grade which is not a bad thing");
                }
                console.log(grades[i]);
            }
            return gradeInfo.join(", a seperate class is, ");
        } catch(err) {
            console.log(err)
            return "Error Fetching Grades";
        }
    }
}

async function getAssignments() {
    let assignment_names = null;
    let assignment_grades = null;
    let assignment_details = null;

    let assignment_info = [];

    let today = new Date();
    const msInOneWeek = 7 * 24 * 60 * 60 * 1000;

    if (options.get_assignments === true && isCanvas()) {
        let assignments = await fetchData(`${domain}/api/v1/planner/items?start_date=2025-01-25T14:48:00.000Z&per_page=50`);

        try {
            for (let i = 0; i < assignments.length; i++) {
                let futureDate = new Date(assignments[i].plannable_date);
                let timeDiff = futureDate.getTime() - today.getTime();
                if (assignments[i].plannable_type === 'assignment' && !assignments[i].submissions.graded && timeDiff > 0 && timeDiff <= msInOneWeek) {
                    assignment_names = assignments[i].plannable.title;
                    assignment_grades = assignments[i].plannable.points_possible;
               
                    let html_fetch = await fetchDataHTML(`${domain}${assignments[i].html_url}`);

                    let parser = new DOMParser();
                    let doc = parser.parseFromString(html_fetch, "text/html");
                    let div_selector = doc.querySelector("div.description");

                    if (div_selector && div_selector.textContent.trim() != '') {
                        assignment_details = div_selector.textContent.trim();
                    } else {
                        assignment_details = "No additional details were added for this assignment.";
                    }
                    assignment_info.push(`The Assignment named '${assignment_names}' has the amount of points ${assignment_grades} with the following instructions '${assignment_details}'`)
                }
            }
            console.log(assignment_info);
        } catch(err) {
            console.log(err);
            return "Error Fetching Assignments";
        }
    }
}

getAssignments();
