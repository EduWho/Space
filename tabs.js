const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');



tabList.addEventListener('keydown', changeTabFocus);

tabs.forEach((tab)=>{
    tab.addEventListener('click', changeTabPanel);
});

let tabFocus = 0;
function changeTabFocus(e){/*tab funcionar com as setas do teclado */
    const keydownLeft = 37; 
    const keydownRight= 39;

    if(e.keyCode === keydownLeft || e.keyCode === keydownRight){
        tabs[tabFocus].setAttribute("tabindex", -1);
        
        if(e.keyCode === keydownRight){
            tabFocus++;
            if(tabFocus >= tabs.length){
                tabFocus = 0;
            }

        } else if(e.keyCode === keydownLeft){
            tabFocus--;
            if(tabFocus < 0){
                tabFocus = tabs.length -1;
            }
        }

        tabs[tabFocus].setAttribute("tabindex", 0);
        tabs[tabFocus].focus();
    }

}

function changeTabPanel(e){
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute("aria-controls");
    const targetImage = targetTab.getAttribute("data-image");

    const tabContainer = targetTab.parentNode; /*seleciona o componente pai (neste caso a div com a class tab-list) */
    const mainContainer = tabContainer.parentNode;/* seleiona o componente pai (neste caso pega no componente  anterio e seleciona o pai desse  )*/

    tabContainer.querySelector('[aria-selected="true"]').setAttribute("aria-selected",false); /*remove a linha da tab selecionada */
    targetTab.setAttribute("aria-selected",true); /* adiciona a linha na tab target  */

    mainContainer.querySelectorAll('[role="tabpanel"]').forEach((panel) =>panel.setAttribute("hidden",true));/* corre todos os articles e adiciona o atributo "hidden"*/
    mainContainer.querySelector([`#${targetPanel}`]).removeAttribute('hidden');/*seleciona o alvo e remove o attibuto hidden (acede atraves do main aos atributos do componente targetpanel )  */


    mainContainer.querySelectorAll('picture').forEach((img) =>img.setAttribute("hidden",true));/* corre todos os articles e adiciona o atributo "hidden"*/
    mainContainer.querySelector([`#${targetImage}`]).removeAttribute('hidden');/*seleciona o alvo e remove o attibuto hidden (acede atraves do main aos atributos do componente targetpanel )  */

}
