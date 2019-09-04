window.onload = function() {

    /* 
    * fill in all fields specified in the url get params
    */

    let params = (new URL(document.location)).searchParams;
    params.forEach((value, key) => {
        let element = document.getElementById(key);
        if (element == null) {
            element = document.getElementById(value);
        }

        //console.log("setting element of type", element.type, element.tagName);
        
        if (element.type == 'checkbox') {
            document.getElementById(key).checked = true;
        }
        else if (element.type == 'radio') { 
            document.getElementById(value).checked = true;
        }
        else { 
            document.getElementById(key).value = value;
        }
    });

    /*
     * add calcBallard to all ballard relevant elements
    */
   calcBallard();
   document.querySelectorAll("#ballard-neuro td, #ballard-physi td").forEach(e => {
       e.addEventListener("click", calcBallard);
   });
   document.querySelectorAll("#ballard-neuro select, #ballard-physi select").forEach(e => {
       e.addEventListener("change", calcBallard);
   });

   document.getElementById("output-text").innerText = generateRecord("admission");
   
};

function update(params) {
    /* update url search param */
    window.history.replaceState({}, '', `${location.pathname}?${params}`);
    calcBallard();
}

function setSelect(id, value) {
    document.getElementById(id).value = value;
    calcBallard();
}

function calcBallard() { 
    /* calc neuro score */
    let neuroscore = Array.from(document.querySelectorAll("#ballard-neuro select"))
    .reduce((sum, element) => sum + parseInt(element.value) || 0, 0);
    document.getElementById("neuro-score").innerText = neuroscore;
    //console.log(neuroscore);
    /* calc physical score */
    let physiscore = Array.from(document.querySelectorAll("#ballard-physi select"))
    .reduce((sum, element) => sum + parseInt(element.value) || 0, 0);
    document.getElementById("physi-score").innerText = physiscore;
    
    document.getElementById("ballard-score").innerText = neuroscore + physiscore;
    document.getElementById("estimate-wk").innerText = Math.round((neuroscore + physiscore)*0.4)+24
    return neuroscore + physiscore
};

function generateRecord(recordType) {
    const params = (new URL(document.location)).searchParams;
    
    data = {
        
    };
    if (recordType == "admission") {
        
        return `\
        <Chief Complaint>
        ${params.get("sex")} newborn admitted for post-partum neonatal care

        <Present Illness>
        This just born ${params.get("sex")} ${params.get("ga-wk")>=37 ? "term" : "preterm"} newborn was born at Kaohsiung Medical University Hospital \
        by a ${params.get("mom-age")}-year-old woman (Gravida ${params.get("mom-grav")} Para ${params.get("mom-para")} Abortion ${params.get("mom-abort")}), \
        gestational age: ${params.get("ga-wk")}+${params.get("ga-day") || 0} weeks via ${params.get("delivery")} on ${params.get("bdate")} ${params.get("btime")}. 
        After birth, the neonate's Apgar scores were ${params.get("apgar-1")} and ${params.get("apgar-5")} at the first minute and fifth minute. 
        ${params.get("prom") == "" ? "" : `Prolonged  rupture of membrane (${params.get("prom")})`}\
        ${params.get("delay-cry") == "" ? "" : `, Delay of initial crying (${params.get("delay-cry")})`}
        
        ${params.get("sex") == "male"?"His":"Her"} mother had no underlying diseases\
        ${params.get("hbsag") == "" ? "" : `, Hepatitis B surface antigen (HBs Ag) (${params.get("hbsag")})`}\
        ${params.get("hbeag") == "" ? "" : `, Hepatitis B e Antigen (HBe Ag) (${params.get("hbeag")})`}\
        ${params.get("vdrl") == "" ? "" : `, venereal disease research laboratory (VDRL) (${params.get("vdrl")})`}\
        ${params.get("rubella-igg") == "" ? "" : `, Rubella immunoglobulin G (${params.get("rubella-igg")})`}\
        ${params.get("gbs") == "" ? "" : `, Group B Streptococcus (GBS) (${params.get("gbs")})`}.
        After delivery, this neonate was admitted to baby room for further care and evaluation.

        <Past History>
        [Birth history]
        Method of delivery: ${params.get("delivery")};  Apgar score (1’/5’): ${params.get("apgar-1")}/${params.get("apgar-5")} 
        ${params.get("prom") == "" ? "" : `Prolonged  rupture of membrane (${params.get("prom")})`}\
        ${params.get("delay-cry") == "" ? "" : `, Delay of initial crying (${params.get("delay-cry")})`}
        Body weight: ${params.get("bw")}gm (${params.get("bw-percent")}th percentile); 
        ${params.get("bw-for-ga")}
        Body length: ${params.get("b-len")}cm (${params.get("b-len-percent")}th percentile)
        Head circumference: ${params.get("head-circum")}cm (${params.get("head-circum-percent")}th percentile)   
        Chest circumference: ${params.get("chest-circum")}cm

        [Maternal History]
        Chart No.: ${params.get("mom-chart-no")} Name: ${params.get("mom-name")}  Age:${params.get("mom-age")}-year-old
        Delivery history: Gravida ${params.get("mom-grav")} Para ${params.get("mom-para")} Abortion ${params.get("mom-abort")}
        Non-Invasive Prenatal Testing (NIPT非侵入性產前檢測) : □Yes, Normal/_______(其他異常報告); □ No
        Aminocentesis (羊膜穿刺術): □Yes, chromosome____________; □ No
        Health state: 
        □Hypertension  □Pregnancy-induced hypertension   □Pre-eclampsia/Eclampsia
        □Diabetes mellitus □Gestational diabetes mellitus 
        □Infectious disease: ______________; □Hereditary disease: ________________
        Other specific findings: ___________________________________________________

        <Personal, Social and Occupational History>
        Contact history: denied 
        Cluster history: denied
        
        <Review of Systems>
        ．General: weakness (-); fever (-);
        ．Skin: rash (-); cyanosis (-);
        ．Head: trauma (-); syncope (-);
        ．Eyes: discharge (-); cataracts (-);
        ．Ears: discharge (-); history of ear infection (-);
        ．Nose: sneeze (-); discharge (-);
        ．Throat and mouth: bleeding gums (-); redness (-);
        ．Respiratory and cardiovascular system: wheezing (-); dyspnea (-);
        ．Gastrointestinal system: nausea (-); vomiting (-);
        ．Genitourinary system: hematuria (-); polyuria (-); [female]age at menarche (-);
        ．Endocrine system: excessive sweating (-);
        ．Musculoskeletal system: joint swelling (-); redness (-);
        ．Hematologic system: anemia (-); easy bruising (-);
        ．Neuropsychiatric system: syncope/fainting (-); seizures (-);

        <Family history>
        Not contributory或請寫出家族病史
        需畫出家族樹

        <Current Medicine>
        None

        <Nutritional Status>
        Body weight: ${params.get("bw")}gm (${params.get("bw-percent")}th percentile); 
        ${params.get("bw-for-ga")}
        Body length: ${params.get("b-len")}cm (${params.get("b-len-percent")}th percentile)
        Head circumference: ${params.get("head-circum")}cm (${params.get("head-circum-percent")}th percentile)

        <Psycho-mental Status>
        Consciousness: ■alert 
        Mentality: ■normal 
        <Performance status/Caring requirements>
        ．Performance status:
        ■ 4 – Bedbound (Completely disabled. Cannot carry on any self-care. Totally confined to bed or chair)
        ．Caring Requirement:
        ■Unable to care for self; REQUIRE equivalent of institutional or hospital care; disease may be progressing rapidly. 
        <Physical examination>
        Vital signs: Body Temperature: ＿°C, Heart Rate: ＿ bpm, Respiratory Rate: ＿ cpm
        Appearance: □Pink □Cyanosis □Pallor, Other: ___________
        Consciousness: □Alert □Drowsy   
        Head: Anterior fontanelle: open, _____finger; Conjunctiva: □pale, Sclera: □icteric □anicteric
        □Caput succedaneum □Cephalhematoma □Subgaleal hemorrhage
        □Milia □Cleft palate, Other specific findings:____________________________________
        Neck: □Supple □Lymphadenopathy □Webbed neck
        Chest: □Symmetric expansion □Clavicle fracture □Pectus excavatum
        Heart sound: □regular □irregular □murmur, grade_____
        Breath sound: □clear □coarse □rale □crackle
        Other specific findings:_____________________________________________________
        Abdomen: □soft □mass, Liver/Spleen: □impalpable □palpable, _____below rib margin
        Bowel sound: □normoactive □hypoactive □hyperactive
        Other specific findings: _____________________________________________________
        Four limbs: □freely movable 
        Other specific findings: ____________________________________________________
        Skin: □Erythema toxicum  □Mongolian spot  □Jaundice  □Ecchymosis
        ** Hip joint: Barlow test (Left/Right) ______/______; 
        Ortolani test (Left/ Right) ______/______
        □Imperforated anus  □Hydrocele  □Cryptochidism
        ** New Ballard Score: ${calcBallard()}, ${Math.round(calcBallard()*0.4)+24} weeks

        <Available laboratory data and examination results>
        Not applicable
        若有驗血糖者請附上血糖值

        <Differential Diagnosis>
        Not applicable

        <Impression/Tentative diagnosis>
        . ${params.get("sex")} ${params.get("ga-wk")>=37 ? "term" : "preterm"} newborn, gestational age ${params.get("ga-wk")}+${params.get("ga-day") || 0} weeks, \
        birth body weight ${params.get("bw")} gm, via ${params.get("delivery")}, \
        Apgar score ${params.get("apgar-1")}/${params.get("apgar-5")}, \
        ${params.get("bw-for-ga")}

        <Problem list (Assessment and Plan)>
        Assessment:
        . ${params.get("sex")} ${params.get("ga-wk")>=37 ? "term" : "preterm"} newborn, gestational age ${params.get("ga-wk")}+${params.get("ga-day") || 0} weeks, \
        birth body weight ${params.get("bw")} gm, ${params.get("bw-for-ga")}

        Plan:
        . Arrange Vitamin K1, hepatitis B vaccination-1st dose and Erythromycin ointment for bilateral eyes \
        ${params.get("hbsag") == "+" ? `\n. Arrange Hepatitis B immune globulin (HBIG)` : ""}
        . Arrange automated auditory brainstem response (aABR, 自動聽性腦幹反應) and newborn screen
        . Breast feeding by demand and check body weight per day 
        . Monitor temperature, pulse, and respiration (TPR) Q8H with rooming-in  (21EB)
        . Monitor temperature, pulse, and respiration (TPR) QD with rooming-in   (22EB)
        ${params.get("hypoglycemic-risk") == "" ? "" : `. Check finger sugar at 1st, 4th and 12th hours after birth, due to ${params.get("hypoglycemia-risk")}`}
        `;
    }
};

//mother
//let momName;
//let momChartNo;
//let momAge;
//let momGrav;
//let momPara;
//let momAbort;
//let hbsAg;
//let hbeAg;
//let vdrl;
//let rubellaIgG;
//let gbs;
let nipt; // non invasive prenatal testing
let amnio;
let htn;


// baby
//let name;
//let sex;
//let ga-wk;
//let ga-day;
//let delivery;
//let bDatetime;
//let apgar;
//let delayCry;
//let prom;
//let bodyWeight;
//let bodyLen;
//let headCircum;
//let chestCircum;