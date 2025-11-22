// Language Manager for HRMS
class LanguageManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('selectedLanguage') || 'en';
        this.translations = {};
        this.rtlLanguages = ['ar'];
        this.availableLanguages = {
            'en': 'English',
            'hi': 'हिंदी',
            'es': 'Español',
            'fr': 'Français',
            'zh': '中文',
            'ar': 'العربية'
        };
        this.init();
    }

    async init() {
        await this.loadLanguage(this.currentLanguage);
        this.updateLanguageSelector();
        this.applyRTL();
    }

    async loadLanguage(lang) {
        try {
            const response = await fetch(`/assets/js/languages/${lang}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load language file: ${lang}`);
            }
            this.translations = await response.json();
            this.currentLanguage = lang;
            localStorage.setItem('selectedLanguage', lang);
            return true;
        } catch (error) {
            console.error('Error loading language:', error);
            return false;
        }
    }

    t(key) {
        const keys = key.split('.');
        let value = this.translations;
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                console.warn(`Translation key not found: ${key}`);
                return key; // Return the key if translation not found
            }
        }
        
        return typeof value === 'string' ? value : key;
    }

    async changeLanguage(lang) {
        const success = await this.loadLanguage(lang);
        if (success) {
            this.updatePageContent();
            this.updateLanguageSelector();
            this.applyRTL();
            this.updatePageTitle();
        }
    }

    updatePageContent() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });

        // Update all elements with data-i18n-placeholder attribute
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translation = this.t(key);
            element.placeholder = translation;
        });

        // Update elements with data-i18n-title attribute
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            const translation = this.t(key);
            element.title = translation;
        });

        // Update page title
        this.updatePageTitle();

        // Update breadcrumb
        this.updateBreadcrumb();

        // Update any dynamic content that might exist
        this.updateDynamicContent();
    }

    updatePageTitle() {
        const pageType = this.getCurrentPageType();
        const titleKey = pageType === 'dashboard' ? 'dashboard.pageTitle' :
                        pageType === 'employee' ? 'employee.pageTitle' :
                        pageType === 'attendance' ? 'attendance.pageTitle' :
                        pageType === 'leaveApproval' ? 'leaveApproval.pageTitle' :
                        pageType === 'payroll' ? 'payroll.pageTitle' :
                        pageType === 'reports' ? 'reports.pageTitle' :
                        'announcements.pageTitle';
        
        const title = this.t(titleKey);
        document.title = `${title} - HRMS`;
        
        const pageTitleElement = document.querySelector('.page-title');
        if (pageTitleElement) {
            pageTitleElement.textContent = title;
        }
    }

    updateBreadcrumb() {
        const breadcrumbElement = document.querySelector('.content-wrap .text-muted, .content-wrap a div');
        if (breadcrumbElement) {
            breadcrumbElement.textContent = this.t('dashboard.breadcrumb');
        }
    }

    updateDynamicContent() {
        // Update employee form placeholders
        const formElements = document.querySelectorAll('input, select, textarea');
        formElements.forEach(element => {
            if (element.hasAttribute('data-i18n-placeholder')) {
                const key = element.getAttribute('data-i18n-placeholder');
                const translation = this.t(key);
                element.placeholder = translation;
            }
        });

        // Update pagination text
        const showingFrom = document.getElementById('showingFrom');
        const showingTo = document.getElementById('showingTo');
        const totalEmployees = document.getElementById('totalEmployees');
        
        if (showingFrom && showingTo && totalEmployees) {
            const showing = this.t('employee.showing');
            const to = this.t('employee.to');
            const of = this.t('employee.of');
            const employees = this.t('employee.employees');
            
            // This will be updated dynamically when table content changes
            showingFrom.parentNode.childNodes[0].textContent = showing + ' ';
            showingFrom.nextSibling.textContent = ' ' + to + ' ';
            showingTo.nextSibling.textContent = ' ' + of + ' ';
            totalEmployees.nextSibling.textContent = ' ' + employees;
        }
    }

    updateLanguageSelector() {
        const languageSelector = document.getElementById('languageSelector');
        if (languageSelector) {
            languageSelector.value = this.currentLanguage;
        }
    }

    applyRTL() {
        const isRTL = this.rtlLanguages.includes(this.currentLanguage);
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
        document.documentElement.lang = this.currentLanguage;
        
        // Add RTL class to body for CSS styling
        if (isRTL) {
            document.body.classList.add('rtl');
            document.body.classList.remove('ltr');
        } else {
            document.body.classList.remove('rtl');
            document.body.classList.add('ltr');
        }
    }

    getCurrentPageType() {
        const path = window.location.pathname;
        if (path.includes('dashboard')) return 'dashboard';
        if (path.includes('employee')) return 'employee';
        if (path.includes('attendance')) return 'attendance';
        if (path.includes('leave-approval')) return 'leaveApproval';
        if (path.includes('payroll')) return 'payroll';
        if (path.includes('reports')) return 'reports';
        if (path.includes('annoucement')) return 'announcements';
        return 'dashboard';
    }

    getAvailableLanguages() {
        return this.availableLanguages;
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }

    isRTL() {
        return this.rtlLanguages.includes(this.currentLanguage);
    }
}

// Initialize language manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.languageManager = new LanguageManager();
    
    // Add language selector event listener
    document.addEventListener('change', function(e) {
        if (e.target.id === 'languageSelector') {
            window.languageManager.changeLanguage(e.target.value);
        }
    });
});

// Global function for logout (if not already defined)
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        // Add logout logic here
        console.log('Logout functionality');
    }
}