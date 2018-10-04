document.getElementById('food-content').style.display = 'block';
document.getElementById('food-tab').className += ' active';

/**
 * Navigate tabs
 * @param {Event} event 
 * @param {String} tab 
 */
const openTab = (event, tab) => {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tab-contents');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    document.getElementById(tab).style.display = 'block';
    event.currentTarget.className += ' active';
}


/**
 * 
 * resource link ref
 * https://tympanus.net/codrops/2015/09/15/styling-customizing-file-inputs-smart-way/
 */
const inputs = document.querySelectorAll('.inputfile');
Array.prototype.forEach.call(inputs, (input) => {
    const label = input.nextElementSibling, labelVal = label.innerHTML;

    input.addEventListener('change', (event) => {
        let fileName = '';
        if (this.files && this.files.length > 1)
            fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
        else
            fileName = event.target.value.split('\\').pop();

        if (fileName)
            label.querySelector('b').innerHTML = fileName;
        else
            label.innerHTML = labelVal;
    });
});