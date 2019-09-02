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

        console.log("setting element of type", element.type, element.tagName);
        
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
   document.querySelectorAll("#ballard-neuro img").forEach(e => {
       e.addEventListener("click", calcBallard);
   });
   document.querySelectorAll("#ballard-neuro select").forEach(e => {
       e.addEventListener("change", calcBallard);
   });

   generateRecord("admission");
};

function update(params) {
    /* update url search param */
    window.history.replaceState({}, '', `${location.pathname}?${params}`);
    calcBallard();
}

function calcBallard() { 
    /* calc neuro score */
    let neuroscore = Array.from(document.querySelectorAll("#ballard-neuro select"))
    .reduce((sum, element) => sum + parseInt(element.value) || 0, 0);
    document.getElementById("neuro-score").innerText = neuroscore;
    console.log(neuroscore);
    /* calc physical score */
};

function generateRecord(recordType) {
    const params = (new URL(document.location)).searchParams;
    data = {
        
    };
    if (recordType == "admission") {
        
        let outputText = 
        `<Chief Complaint>
        ${params.get("sex")} newborn admitted for post-partum neonatal care

        <Present Illness>
        This just born ${params.get("sex")} ${params.get("gaWk")>=37 ? "term" : "preterm"} newborn was born at Kaohsiung Medical University Hospital \
        by a ${params.get("mom-age")}-year-old woman (Gravida ${params.get("mom-grav")} Para ${params.get("mom-para")} Abortion ${params.get("mom-abort")}), \
        gestational age: ${params.get("gaWk")}+${params.get("gaDay") || 0} weeks via ${params.get("delivery")} on ${params.get("bdate")} ${params.get("btime")}. 
        After birth, the neonate's Apgar scores were ${params.get("apgar-1")} and ${params.get("apgar-5")} at the first minute and fifth minute. 
        Delay of initial crying (-), prolonged rupture of membrane (-). 
        
        ${params.get("sex") == "male"?"His":"Her"} mother had no underlying diseases, \
        Hepatitis B surface antigen (HBs Ag) (-), \
        Hepatitis B e Antigen (HBe Ag) (-), \
        venereal disease research laboratory (VDRL) (-), \
        Rubella immunoglobulin G (+), \
        Group B Streptococcus (GBS) (-).
        After delivery, this neonate was admitted to baby room for further care and evaluation.

        <Past History>
        [Birth history]
        Method of delivery: ${params.get("delivery")};  Apgar score (1’/5’): ${params.get("apgar-1")}${params.get("apgar-5")} 
        □Prolonged  rupture of membrane , □Delay of initial crying
        Body weight: ____________gm (_____th percentile); 
        □Small for gestational age □Appropriate for gestational age □Large for gestational age 
        Body length: ____________cm (_____th percentile)
        Head circumference: ___________cm (_____th percentile)   
        Chest circumference: ___________cm

        [Maternal History]
        Chart No.: _______________ Name: ${params.get("mom-name")}  Age:${params.get("mom-age")}-year-old
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
        Body weight: ____________gm (_____th percentile); 
        □Small for gestational age □Appropriate for gestational age □Large for gestational age
        Body length: ____________cm (_____th percentile)
        Head circumference: ___________cm (_____th percentile)   

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
        ** New Ballard Score: ______(填分數), ______ weeks(填預估週數) 

        <Available laboratory data and examination results>
        Not applicable
        若有驗血糖者請附上血糖值

        <Differential Diagnosis>
        Not applicable

        <Impression/Tentative diagnosis>
        . ${params.get("sex")} ${params.get("gaWk")>=37 ? "term" : "preterm"} newborn, gestational age ${params.get("gaWk")}+${params.get("gaDay") || 0} weeks, \
        birth body weight _____ gm, via normal spontaneous delivery/vaginal delivery/vacuum extraction delivery/Cesarean section(生產方式請記得選), Apgar score __'-/___', small/appropriate/large for gestational age(生長評估請記得選)

        <Problem list (Assessment and Plan)>
        Assessment:
        . ${params.get("sex")} ${params.get("gaWk")>=37 ? "term" : "preterm"} newborn, gestational age ${params.get("gaWk")}+${params.get("gaDay") || 0} weeks, \
        birth body weight _____ gm, small/appropriate/large for gestational

        Plan:
        . Arrange Vitamin K1, hepatitis B vaccination-1st dose and Erythromycin ointment for bilateral eyes 
        . Arrange Hepatitis B immune globulin (HBIG) 如果有打再填這項 沒打就刪除
        . Arrange automated auditory brainstem response (aABR, 自動聽性腦幹反應) and newborn screen
        .Breast feeding by demand and check body weight per day 
        .Monitor temperature, pulse, and respiration (TPR) Q8H with rooming-in  (21EB)
        . Monitor temperature, pulse, and respiration (TPR) QD with rooming-in   (22EB)
        .Check finger sugar at 1st, 4th and 12th hours after birth(符合低血糖高風險者須填寫), due to____
        `;
        document.getElementById("output-text").innerText = outputText;
    }
}

//mother
let momName;
let momChartNo;
let momAge;
let momGrav;
let momPara;
let momAbort;
let hbsAg;
let hbeAg;
let vdrl;
let rubellaIgG;
let gbs;
let nipt; // non invasive prenatal testing
let amnio;
let htn;


// baby
//let name;
//let sex;
let gaWk;
let gaDay;
let delivery;
let bDatetime;
let apgar;
let delayCry;
let prom;
let bodyWeight;
let bodyLen;
let headCircum;
let chestCircum;


let cc = "";
let hpi = "This just born ${sex} ${term} newborn was born at Kaohsiung Medical University Hospital by a ${momAge}-year-old woman (Gravida ${} Para__Abortion__), gestational age: _____ weeks via normal spontaneous delivery/vaginal delivery/vacuum extraction delivery/Cesarean section (生產方式請記得選) on ____/___/___ ___:___ AM/PM. After birth, the neonate's Apgar scores were ____ and ____ at the first minute and fifth minute. Delay of initial crying (-), prolonged rupture of membrane (-). His/Her(性別請記得選) mother had no underlying diseases, Hepatitis B surface antigen (HBs Ag) (-), Hepatitis B e Antigen (HBe Ag) (-),venereal disease research laboratory (VDRL) (-), Rubella immunoglobulin G (+),Group B Streptococcus (GBS) (-). After delivery, this neonate was admitted to baby room for further care and evaluation."