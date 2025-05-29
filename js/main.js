window.addEventListener("load", function() {
    let start = document.querySelector("#start");
	let headerBar = document.querySelector("#header .header-inner");
    let menuArea = start.firstElementChild;
	let sectionList=document.querySelectorAll("section[id]");
    let menu = document.querySelector("nav");
    let menuList = menu.querySelectorAll("li");
	let menuBtn = document.querySelector(".menu_btn");
	let openMenu = document.querySelector(".open");
	let closeMenu = document.querySelector(".close");
	let nav = document.querySelector("#header .menu nav");
	let moText = document.querySelector("#header .menu p.mo_t");

    let skillTitle = document.querySelectorAll("#skill .left li");
    let skillTab = document.querySelectorAll("#skill .right_b li");
	const rightB = document.querySelector("#skill .right_b");

	let imgBox=document.querySelectorAll("#open-s .box");
	let customCursor1=document.querySelector(".curser-wrap");
	let customCursor2=document.querySelector(".curser-wrap .cursor");
	let track=document.querySelector(".track");
	
	let trackText=track.firstElementChild;
	let clone=trackText.cloneNode(true);

	let btnTop=document.querySelector("#top");

	let dragFlag=false;

	document.addEventListener("mousemove", function(e) {
		gsap.to(customCursor1, {
			x: e.clientX,
			y: e.clientY,
			xPercent: -50,
			yPercent: -50,
			opacity: 1,
			duration: 0.1,
		});
    });

	const mm = gsap.matchMedia();

    mm.add("(min-width: 767px)", function() {
        const imgItems = gsap.utils.toArray(".side-project .img");
        imgItems.forEach(item => {
            const decorationTl = gsap.timeline({
                scrollTrigger: {
                    trigger: item,
                    start: "top 70%",
                    end: "200% 70%",
                    scrub: 0,
                }
            });

            decorationTl
			.to(item, { opacity: 1 })
			.to(item, { opacity: 0 });
        });
    });
	
	let pageList=[];

	sectionList.forEach(function(item){
		if(item.getAttribute("id") != "footer"){
			pageList.push(item);
		}
	});

	let offsetList=pageList.map((item, i) => {
		if(i !== 2){
			return item.offsetTop+3000; // "end+=3000"
		}
		else{
			return pageList[i-1].offsetTop+pageList[i-1].clientHeight+3000;
		}
	});

	offsetList.shift();

	// console.log(offsetList);

	function controlMenu(m) {
		menuList.forEach(function(item, i) {
			if (i === m) {
				menuList[i].classList.add("active");
			} else {
				menuList[i].classList.remove("active");
			}
		});
		if (m !== 0) {
			menuArea.classList.add("fixed");
			btnTop.classList.add("active");
		} else {
			menuArea.classList.remove("fixed");
			btnTop.classList.remove("active");
		}
	}

	pageList.forEach(function(item, i){
		gsap.timeline({
			scrollTrigger: {
				trigger: item,
				start: "top center",
				end: "bottom center",
				onEnter: function(){
					controlMenu(i);
				},
				onEnterBack: function(){
					controlMenu(i);
				}
			}
		});
	});

	menuBtn.addEventListener("click", function(e){
		e.preventDefault();

		openMenu.classList.toggle("active");
		closeMenu.classList.toggle("active");
		headerBar.classList.toggle("active");
		menu.classList.toggle("active");
		moText.classList.toggle("active");

		if (menu.classList.contains("active")) {
			const menuItems = menu.querySelectorAll("nav ul li");
			menuItems.forEach((item, index) => {
				gsap.fromTo(item, 
					{ y: 20, opacity: 0 },
					{ y: 0, opacity: 1, duration: 0.3, delay: index * 0.1 } 
				);
			});
		}
	});

	let topPos=0;

	window.addEventListener("resize", function(){
		if(window.innerWidth > 768 &&  menuBtn.classList.contains("active")){
			openMenu.classList.remove("active");
			closeMenu.classList.remove("active");
			headerBar.classList.remove("active");
			menu.classList.remove("active");
			moText.classList.remove("active");
		}
	});

	menuList.forEach(function(item, i){
		item.addEventListener("click", function(e){
			e.preventDefault();
			const targetSection=document.querySelector(item.querySelector("a").getAttribute("href")); // href에서 ID를 가져옴

			const targetPos=targetSection.offsetTop;
			// console.log(targetSection, targetPos);

			// console.log(offsetList[i]);

			if(i !== 1){
				gsap.to(window, { scrollTo: targetPos, duration: 0.6, ease: "power3out" });
			}
			else{
				gsap.to(window, { scrollTo: offsetList[i], duration: 0.6, ease: "power3out" });
			}
			openMenu.classList.remove("active");
			closeMenu.classList.remove("active");
			headerBar.classList.remove("active");
			menu.classList.remove("active");
			moText.classList.remove("active");
		});
	
	});

	window.addEventListener("scroll", function() {
		let scrollPosition=window.scrollY;

		// console.log(scrollPosition);
		// controlMenu(scrollPosition);
	});

    lenisAnimation();

    const keytextTl = gsap.timeline();

    keytextTl.from("#main .keytext", { opacity: 0, duration: 1, delay: 1.5 }, "time1");
    keytextTl.from("#main .keytext p span i", { y: 15, duration: 0.5 }, "time2");
    keytextTl.to("#main .keytext p span i", { y: 15, duration: 1, delay: 1 }, "time3");
    keytextTl.to("#main .keytext p.text1", { left: 0, top: "7%", duration: 0.4, ease: "Power3Out" }, "time4");
    keytextTl.to("#main .keytext p.text2", { right: 0, top: "105%", duration: 0.4, ease: "Power3Out" }, "time4");
    keytextTl.fromTo("#pj-view", { xPercent: 100, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.3, ease: "Power3Out" }, "time5");

	let xPercentValue;

	if (window.innerWidth > 1270) {
		xPercentValue = -120; 
	} else if (window.innerWidth > 540) {
		xPercentValue = -300; 
	} else {
		xPercentValue = -300; 
	}

    keytextTl.fromTo("#pj-view", { xPercent: 0 }, {
        xPercent: xPercentValue,
        scrollTrigger: {
            trigger: "#start",
            pin: true,
            scrub: true,
            start: "top top",
            end: "+=3000"
        }
    }, "time6");

    keytextTl.to("#header", { opacity: 1, duration: 0.2, delay: 0.3 }, "time7");
    keytextTl.fromTo(".author", { xPercent: -100, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.2 }, "time8");
	

    // skills

    const skillsTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#skill",
            start: "top top",
            end: "bottom bottom",
			// markers:true
        }
    });

    skillsTl.to("#skill .left a .main_t h2, #skill .left a .sub p", { y: 0, duration: 0.2 });
    skillsTl.to("#skill .left a .main_t h2, #skill .right_b ul li", { x: 0, duration: 0.2 });

	// project

	const projectTl1=gsap.timeline({
		scrollTrigger: {
			trigger: ".main-project",
			start: "-10% 50%",
			end: "0% 50%",
			scrub: 0,
			// markers: true
		}
	});

	projectTl1
	.to(".main-project .first", { width: "100%" }, "a")
	.from(".main-project", { yPercent: 1 }, "a");

	const projectTl2=gsap.timeline({
		scrollTrigger: {
			trigger: ".main-project",
			scrub: 0,
			start: "0 0",
			end: "100% 100%",
			// markers: true
		}
	});

	projectTl2
	.to(".main-project .second", { transform: "translateY(0)" }, "a+=0.1")
	.to(".main-project .second", { width:"100%" }, "a")
	.to(".main-project .first .img-wrap", { opacity: 0 }, "a+=0.1")
	.to(".pagenation_wrap li", { xPercent: -100 }, "a")
	.to(".main-project .third", { transform: "translateY(0)" }, "b")
	.to(".main-project .third", { width:"100%"}, "b")
	.to(".main-project .first .img-wrap", { opacity:0}, "b-=0.1")
	.to(".pagenation_wrap li", { xPercent: -200 }, "b")
	.to(".main-project .fourth", { transform: "translateY(0)" }, "c")
	.to(".main-project .fourth", { width: "100%" }, "c")
	.to(".main-project .third .img-wrap", { opacity: 0 }, "c-=0.1")
	.to(".pagenation_wrap li", { xPercent: -300 }, "c");

	// opensource

	const openTl = gsap.timeline({
		scrollTrigger: {
			trigger: "#open-s",
			start: "top center",
			end: "bottom 10%",
			scrub: true,
			// markers: true
		}
	});

	openTl.from(".img_box .box", { y: 30, opacity: 0,  duration: 0.5, stagger: 0.2 });

	imgBox.forEach(function(item) {
		item.addEventListener("mouseenter", function() {
			item.classList.add("active");
		});

		item.addEventListener("mouseleave", function() {
			item.classList.remove("active");
		});
    });
	
	const textTl=gsap.timeline({ repeat: -1, ease: "none" });

	let isMobile;

	function resizeHandler(){
		if(window.innerWidth > 768){
			if(isMobile != false){
				isMobile=false;

				textTl.clear();

				let unitHeight=track.firstElementChild.clientWidth;

				textTl.set(track, { x: 0, rotate: 90 });

				textTl.to(track, {
					y: unitHeight*-3,
					duration: 100
				});
	
			}
		}
		else{
			if(isMobile != true){
				isMobile=true;

				textTl.clear();

				let unitHeight=track.firstElementChild.clientWidth;

				textTl.set(track, { y: 0, rotate: 0 });

				textTl.to(track, {
					x: unitHeight*-3,
					duration: 100
				});
			}
		}
	}

	resizeHandler();

	window.addEventListener("resize", resizeHandler);

	
	// btnTop
	btnTop.addEventListener("click", function(e){
		e.preventDefault();

		gsap.to(window, { scrollTo: 0, duration: 0.4 });
	});

	const skillData=[
		{
			subject: "HTML",
			h2: ["웹 표준 및 접근성 준수", "구조적이고 체계적인 설계"],
			p: [
				"웹 접근성을 고려한 구조 설계로 다양한 사용자와 디바이스에 대응할 수  있는 웹페이지 구현",
				"섹션 기반 레이아웃을 설계하여 명확한 정보 계층 구조를 제공 및 태그를 활용한 체계적인 <br> 데이터 표현"
			]
		},
		{
			subject: "CSS",
			h2: ["반응형 웹 디자인", "디자인 시스템 표현"],
			p: [
				"미디어 쿼리(Media Query)를 활용해 데스크탑, 태블릿, 모바일 등 다양한 디바이스 환경에 맞춘 레이아웃 구현 및 적응형 이미지와 비율 기반 레이아웃을 활용해 각 해상도에 최적화된 디자인 제공",
				"색상, 폰트, 간격 등 반복적인 스타일 요소를 효율적으로 관리하며 Parallax 효과, 스크롤 애니메이션 등 CSS를 활용한 동적인 웹페이지 제작"
			]
		},
		{
			subject: "JavaScript",
			h2: ["동적인 웹 구현", "데이터 처리 및 조작"],
			p: [
				"클릭, 키보드, 스크롤 등에 반응하는 인터렉션 구현 및 CSS 애니메이션을 제어",
				"배열, 객체를 활용한 데이터 정리와 처리, let, const등을 활용한 간결하고 직관적인 코드 작성"
			]
		},
		{
			subject: "SCSS",
			h2: ["CSS 확장", "SCSS를 활용해 사용자 경험 향상"],
			p: [
				"기존 CSS 문법과 호환되며, CSS를 보다 효율적이고 체계적으로 관리하도록 확장",
				"Parallax 효과와 스크롤 애니메이션을 CSS로 구현하여 동적인 웹페이지를 제작함으로써 사용자 경험을 향상"
			]
		},
		{
			subject: "PWA",
			h2: ["프로그레시브 웹 앱(PWA) 구현", "유동적인 UI"],
			p: [
				"사용자 경험을 극대화하며 반응형 디자인 최적화를 통해 다양한 디바이스에서 최적의 성능을 구현",
				"CSS 미디어 쿼리와 유연한 그리드를 사용하여 다양한 환경에 적합한 사용자 인터페이스 구성"
			]
		},
		{
			subject: "React",
			h2: ["컴포넌트 기반 개발", "상태 관리"],
			p: [
				"React의 컴포넌트를 활용하여 재사용 가능한 UI 요소를 구축, 컴포넌트의 상태를 관리하고, 라이프사이클을 이해",
				"CSS, Sass 또는 styled-components를 이용해 컴포넌트를 스타일링"
			]
		}
	];

	let skillList=document.querySelectorAll("#skill .family");
	let renderDOM=document.querySelector("#skill .right_b ul li")
	let skillsN;

	function skillUI(n){
		if(n == skillsN) return;

		skillsN=n;

		skillList.forEach(function(item, i){
			if(i == n){
				item.classList.add("active");
			}
			else{
				item.classList.remove("active");
			}

			let renderHTML="";

			renderHTML+=`
			<h3>${skillData[n].subject}</h3>
			<div class="desc">
				<h2>${skillData[n].h2[0]}</h2>
				<p>${skillData[n].p[0]}</p>
				<h2>${skillData[n].h2[1]}</h2>
				<p>${skillData[n].p[1]}</p>
			</div>
			`;

			renderDOM.innerHTML=renderHTML;

			gsap.fromTo(renderDOM, { opacity: 0 }, { opacity: 1, duration: 1 });
		});
	}

	skillUI(0);

	skillList.forEach(function(item, i){
		item.addEventListener("click", function(e){
			e.preventDefault();

			skillUI(i);
		});
	});
	
	let contact = document.querySelector(".contact");

	contact.addEventListener("click", function(e) {
		e.preventDefault(); 
		const footer = document.querySelector("#footer"); 
		gsap.to(window, { scrollTo: footer, duration: 0.6, ease: "power3.out" }); 
	});
});