document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        const activeButton = document.querySelector('.tab-button.active');
        const activePanel = document.querySelector('.tab-panel.active');

        // Deactivate the currently active tab
        activeButton.classList.remove('active');
        activePanel.classList.remove('active');

        // Activate the new tab
        button.classList.add('active');
        const newPanel = document.getElementById(button.dataset.tab);
        newPanel.classList.add('active');
    });
});