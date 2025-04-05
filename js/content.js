const domain = window.location.origin;
const current_page = window.location.pathname;
let assignments = null;
let grades = null;
let options = {
    get_grades: true
};
let gradeInfoString = null;

async function fetchData(url) {
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    let data = await response.json();
    
    let corrected_data = [];

    for (let i = 0; i < data.length; i++) {
        if (!data[i].concluded) {
            corrected_data.push(data[i]);
        }
    }
    
    return corrected_data;
}

function isCanvas() {
    if (domain === "https://canvas.oregonstate.edu") {
        return true;
    }
    return false;
}

function getGrades() {
    let gradeInfo = [];

    if (options.get_grades === true && isCanvas()) {
        fetchData(`${domain}/api/v1/courses?include[]=concluded&include[]=total_scores&include[]=computed_current_score&per_page=100`).then((grades) => {
            for (let i = 0; i < grades.length; i++) {
                if (!grades[i]["name"]) {
                    continue;
                }
                if (grades[i].enrollments?.[0]?.computed_current_score) {
                    gradeInfo.push(grades[i]["name"] + " this class has a grade on a normal university grading scale of, " + grades[i].enrollments[0].computed_current_score + "%");
                }
                else {
                    gradeInfo.push(grades[i]["name"] + " doesn't yet have a grade which is not a bad thing");
                }
            }
            console.log(gradeInfo.join(", a seperate class is, "));
        })
        .catch((err) => {
            console.log(err)
        });
    }
}