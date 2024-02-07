import { useEffect, useRef, useState } from 'react';
import './Navbar.css';

export default function Navbar({
    heroRef,
    backgroundRef,
    skillsRef,
    projectsRef }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    function handleMobileMenuClick() {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    function smoothScrollTo(element, duration) {
        const targetPosition = element.offsetTop - 128;
        const startPosition = window.scrollY || window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function scrollAnimation(currentTime) {
            if (startTime === null) {
                startTime = currentTime;
            }

            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const easeInOutCubic = progress < 0.5
                ? 4 * progress ** 3
                : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;

            window.scrollTo(0, startPosition + distance * easeInOutCubic);

            if (timeElapsed < duration) {
                requestAnimationFrame(scrollAnimation);
            }
        }
        requestAnimationFrame(scrollAnimation);
    };

    function navigateSections(sectionRef) {
        if (sectionRef.current) {
            smoothScrollTo(sectionRef.current, 1000);
        }
        setIsMobileMenuOpen(false);
    };



    // Clicking outside of the navbar will close mobile navbar.
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (isMobileMenuOpen && !event.target.closest('.container')) {
                setIsMobileMenuOpen(false);
            };
        };
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isMobileMenuOpen]);

    return (
        <header>
            <nav className={`container ${isMobileMenuOpen ? 'show-menu' : ''}`}>
                <a className='nav-logo' onClick={() => navigateSections(heroRef)}>
                    <span>raidev</span>
                    <svg width={32} height={32} fill='currentColor' viewBox='0 0 24 24'>
                        <svg fill='currentColor' viewBox='0 0 24 24'>
                            <path d='M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2ZM4 19V7h16l.002 12H4Z'></path>
                            <path d='m9.293 9.297-3.707 3.707 3.707 3.707 1.414-1.414-2.293-2.293 2.293-2.293-1.414-1.414Zm5.414 0-1.414 1.414 2.293 2.293-2.293 2.293 1.414 1.414 3.707-3.707-3.707-3.707Z'></path>
                        </svg>
                    </svg>
                </a>

                <span className='hamburger-icon' onClick={handleMobileMenuClick}>
                    &#9776;
                </span>

                <ul className={`nav-items ${isMobileMenuOpen ? 'show-menu' : ''}`}>
                    <li onClick={() => navigateSections(heroRef)}>
                        <a href='#hero'>_introduction</a>
                    </li>
                    <li onClick={() => navigateSections(backgroundRef)}>
                        <a href='#background'>_background</a>
                    </li>
                    <li onClick={() => navigateSections(skillsRef)}>
                        <a href='#skills'>_skills</a>
                    </li>
                    <li onClick={() => navigateSections(projectsRef)}>
                        <a>_projects</a>
                    </li>
                </ul>
            </nav>
            <span className='scroll-to-top'>
                <svg stroke='currentColor' fill='currentColor' strokeWidth='0' viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M256 504c137 0 248-111 248-248S393 8 256 8 8 119 8 256s111 248 248 248zm0-448c110.5 0 200 89.5 200 200s-89.5 200-200 200S56 366.5 56 256 145.5 56 256 56zm20 328h-40c-6.6 0-12-5.4-12-12V256h-67c-10.7 0-16-12.9-8.5-20.5l99-99c4.7-4.7 12.3-4.7 17 0l99 99c7.6 7.6 2.2 20.5-8.5 20.5h-67v116c0 6.6-5.4 12-12 12z'>
                    </path>
                </svg>
            </span>
        </header>
    )
};