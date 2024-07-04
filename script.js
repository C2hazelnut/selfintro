const profilePhoto = document.querySelector(".profile-photo");

// const profilePhoto = document.queryElementsByClassName(".profile-photo")
profilePhoto.addEventListener("click", () => {
    // if(document.body.className == 'dark-mode'){
    //      document.body.className = ''
    // }else {
    //     document.body.className='dark-mode'
    // }
    document.body.classList.toggle("dark-mode")
});

// const sections = document.querySelectorAll('.right section');
// sections.forEach((section, index) => {
//     section.addEventListener('click', function(event) {
//         const sectionWidth = section.offsetWidth;
//         const clickX = event.clientX - section.getBoundingClientRect().left;

//         if (clickX < sectionWidth / 2) {
//             if(index != 0){
//                 section.style.display = 'none';
//                 sections[index - 1].style.display = 'flex';            
//             }
//         } else {
//             if(index != (sections.length - 1)){
//                 section.style.display = 'none';
//                 sections[index + 1].style.display = 'flex';
//             }
//         }
//     });
// });
   // const sections = document.querySelectorAll('.right section');

    // for (let index = 0; index < sections.length; index++) {
    //     const section = sections[index];
    //     section.addEventListener('click', function(event) {
    //         const sectionWidth = section.offsetWidth;
    //         const clickX = event.clientX - section.getBoundingClientRect().left;
    
    //         if (clickX < sectionWidth / 2) {
    //             if (index != 0) {
    //                 section.style.display = 'none';
    //                 sections[index - 1].style.display = 'flex';
    //                 currentIndex = index - 1;
    //             }
    //         } else {
    //             if (index != (sections.length - 1)) {
    //                 section.style.display = 'none';
    //                 sections[index + 1].style.display = 'flex';
    //                 currentIndex = index + 1;
    //             }
    //         }
    //     });
    // }

fetch("https://m.search.naver.com/p/csearch/content/apirender.nhn?where=nexearch&pkid=387&_2240701513310827321_1720073454822&u2=20030814&q=생년월일+운세&u1=f&u3=solar&u4=5&_=1720073454830")
    .then(response => response.json()) // 응답을 JSON으로 파싱
    .then(data => {
        const htmlString = data.flick[0]; // 첫 번째 항목 선택
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const fortune = doc.querySelector('dd b').textContent;
        const fortuneText = doc.querySelector('dd p').textContent;        
        console.log(fortune); // 추출한 텍스트 출력
        console.log(fortuneText); // 추출한 텍스트 출력

        const fortuneE =  document.createElement("h3")
        fortuneE.style.margin = 0
        fortuneE.textContent = fortune

        const fortuneTextE =  document.createElement("p")
        fortuneTextE.textContent = fortuneText
        
        const fortuneSection =  document.createElement("section")
        const sectionTitle = document.createElement("h2");
        sectionTitle.textContent = '오늘의 운세';
        // append : 자식중 가장 마지막에 삽입
        fortuneSection.append(sectionTitle);
        fortuneSection.append(fortuneE)
        fortuneSection.append(fortuneTextE)
        
        // after, before는 앞뒤 즉 형제가 되는겁니다.
        const contactSection = document.querySelector(".contact");
        contactSection.before(fortuneSection);

        const sections = document.querySelectorAll('.right section');
        let currentIndex = 0;

        const showAfterSection = () => {
            sections.forEach((section) => {section.style.display = 'none'})
            if(currentIndex == sections.length -1 ){
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            sections[currentIndex].style.display = 'flex'
        }
        const showBeforeSection = () => {
            sections.forEach((section) => section.style.display = 'none'); // 현재 섹션 숨기기
            if(currentIndex == (0)){
                currentIndex = sections.length - 1
            }
            else{
                currentIndex -- 
            }
            //currentIndex = (currentIndex + 1) % sections.length; // 다음 섹션 인덱스 계산
            sections[currentIndex].style.display = 'flex'; 
        }

        let intervalId = setInterval(showAfterSection, 3000);

        const resetInterval = () => {
            clearInterval(intervalId); 
            intervalId = setInterval(showAfterSection, 3000); 
        };

        const iconContainer = document.querySelector(".icon-container");

        sections.forEach((section, index) => {
            section.addEventListener('click', function(event) {
                const sectionWidth = section.offsetWidth;
                const clickX = event.clientX - section.getBoundingClientRect().left;

                if (clickX < sectionWidth / 3) { 
                    showBeforeSection()
                    resetInterval();
                    iconContainer.innerHTML = '<i class="fa-solid fa-backward-fast"></i>';
                } else if (clickX > (sectionWidth * 2 / 3)) { 
                    showAfterSection()
                    resetInterval();
                    iconContainer.innerHTML = '<i class="fa-solid fa-forward-fast"></i>';
                } else { 
                    if (intervalId) {
                        clearInterval(intervalId); 
                        intervalId = null;
                        iconContainer.innerHTML = '<i class="fa-solid fa-pause"></i>';
                    } else {
                        intervalId = setInterval(showAfterSection, 3000); 
                        iconContainer.innerHTML = '<i class="fa-solid fa-play"></i>'
                    }
                }
            });

            section.addEventListener('mousemove', function(event) {
                const sectionWidth = section.offsetWidth;
                const clickX = event.clientX - section.getBoundingClientRect().left;

                iconContainer.style.top = `${event.clientY - 20}px`;
                iconContainer.style.left = `${event.clientX - 20}px`;

                if (clickX < sectionWidth / 3) {
                    iconContainer.innerHTML = '<i class="fa-solid fa-backward-fast"></i>';
                } else if (clickX > sectionWidth * 2 / 3) {
                    iconContainer.innerHTML = '<i class="fa-solid fa-forward-fast"></i>';
                } else {
                    if (intervalId) {
                        iconContainer.innerHTML = '<i class="fa-solid fa-pause"></i>';
                    }else{
                        iconContainer.innerHTML = '<i class="fa-solid fa-play"></i>'
                    }
                }
            });

            section.addEventListener('mouseleave', function() {
                iconContainer.innerHTML = '';
            });
        });
})