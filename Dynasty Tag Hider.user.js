// ==UserScript==
// @name        Dynasty Title and Tag Blocker
// @namespace   dynasty-scans.com
// @include     https://dynasty-scans.com/*
// @version     1.0
// @grant       none
// @author      Helios
// @downloadURL lol
// @updateURL   gl
// ==/UserScript==

(function () {
  'use strict';

  /* Constants */

  const tagsHref = 'https://dynasty-scans.com/tags';
  const seriesHref = 'https://dynasty-scans.com/series';
  const hiddenMapId = 'taghider-tags';
  const seriesMapId = 'serieshider-names';

  /* Definitions */

  /* Set up show/hide toggles on the Tags page */
  function addShowHideElements (hideMap) {
    Array.from(document.getElementsByTagName('dd')).forEach(dd => {
      Array.from(dd.children)
        .filter(e => e.tagName === 'A')
        .forEach(a => {
          const tagName = a.textContent;
          if (hideMap[tagName]) {
            applyHiddenStyle(a);
          }
          const toggleLink = createToggleElement(hideMap, tagName);
          toggleLink.onclick = () => {
            if (hideMap[tagName]) {
              delete hideMap[tagName];
              toggleLink.textContent = 'Hide';
              removeHiddenStyle(a);
            } else {
              hideMap[tagName] = true;
              toggleLink.textContent = 'Show';
              applyHiddenStyle(a);
            }
            localStorage.setItem(hiddenMapId, JSON.stringify(hideMap));
          };
          hideTogglePartial(toggleLink)();
          dd.appendChild(toggleLink);
          dd.addEventListener('mouseenter', showTogglePartial(toggleLink));
          dd.addEventListener('mouseleave', hideTogglePartial(toggleLink));
        });
    });
  }
function addShowHideElementsSeries (hideMap) {
    Array.from(document.getElementsByTagName('dd')).forEach(dd => {
      Array.from(dd.children)
        .filter(e => e.tagName === 'A')
        .forEach(a => {
          const tagName = a.textContent;
          if (hideMap[tagName]) {
            applyHiddenStyle(a);
          }
          const toggleLink = createToggleElement(hideMap, tagName);
          toggleLink.onclick = () => {
            if (hideMap[tagName]) {
              delete hideMap[tagName];
              toggleLink.textContent = 'Hide';
              removeHiddenStyle(a);
            } else {
              hideMap[tagName] = true;
              toggleLink.textContent = 'Show';
              applyHiddenStyle(a);
            }
            localStorage.setItem(seriesMapId, JSON.stringify(hideMap));
          };
          hideTogglePartial(toggleLink)();
          dd.appendChild(toggleLink);
          dd.addEventListener('mouseenter', showTogglePartial(toggleLink));
          dd.addEventListener('mouseleave', hideTogglePartial(toggleLink));
        });
    });
  }

  /* Create a show/hide toggle element */
  function createToggleElement (hideMap, tagName) {
    const toggleLink = document.createElement('a');
    toggleLink.textContent = hideMap[tagName] ? 'Show' : 'Hide';
    Object.assign(toggleLink.style, {
      borderRadius: '3px',
      backgroundColor: 'rgb(0, 51, 102)',
      textDecoration: 'none',
      cursor: 'pointer',
      marginLeft: '6px',
      padding: '2px 6px',
      color: 'white'
    });
    return toggleLink;
  }

  /* Hide tags on page that are designated hidden */
  function hideTags (hideMap) {;
                               let counter = -2;
                               let testing = Array.from(document.getElementsByClassName('name'));
    Array.from(document.getElementsByClassName('tags'))
      .forEach(
         tagContainer => {
             counter = counter+1;
            // counter = counter + tagContainer.children.length;
        Array.from(tagContainer.children)
          .filter(e => e.classList.contains('label'))
          .forEach(label => {
            const tagName = label.textContent;
            if (hideMap[tagName]) {
              label.style.display = 'none';
              tagContainer.style.display = 'none';
              testing[counter].style.display = 'none';
            }});
              //counter = counter+1;
  })}
  function hideSeries(seriesMap){
      let counter = 0;
      let series = Array.from(document.getElementsByClassName('name'));
      let flag = false;
      for(let i=0;i<series.length;i++){
          var seriesCh = series[i].textContent;
          var titleLength = seriesCh.length;
          for(let j=0; j<titleLength;j++){
              if(seriesMap[seriesCh.substr(0,j)]){
               if(seriesCh[j]=='c'){
                   break;
               }
              flag = true;
              break;
              }
          }
          //console.log(JSON.parse(JSON.stringify(seriesCh)));
      if(flag){
      series[i].style.display = 'none';
      }
      flag = false;
    }
  }

  /* Style to apply to hidden tags on Tags page */
  function applyHiddenStyle (a) {
    a.style.textDecoration = 'line-through';
    a.style.color = '#d32f2f';
  }

  /* Remove styles from tags when unhidden on Tags page */
  function removeHiddenStyle (a) {
    a.style.removeProperty('text-decoration');
    a.style.removeProperty('color');
  }

  /* Event handlers */

  const showTogglePartial = toggleLink => () => toggleLink.style.display = 'initial';
  const hideTogglePartial = toggleLink => () => toggleLink.style.display = 'none';


  /* Main */

  const hiddenMap = JSON.parse(localStorage.getItem(hiddenMapId)) || {};
  const seriesMap = JSON.parse(localStorage.getItem(seriesMapId)) || {};

  if (document.URL === tagsHref) {
    addShowHideElements(hiddenMap);
  } else if (document.URL === seriesHref){
     addShowHideElementsSeries(seriesMap);
  } else {
    hideTags(hiddenMap);
     hideSeries(seriesMap);
  }

})();