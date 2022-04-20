window.addEventListener("load", (e) => {
    let ajaxClass = new AjaxClass();

    document.getElementById('il_name').addEventListener('change', function (event){
        ajaxClass.carregarContingut('/AjaxPost/Server/municipisByProvincia.php',
            'POST', 'codiIlla=' + event.target.value, function (text) {
            let tag_mun = text.getElementsByTagName("mun");
            console.log(tag_mun);
            let desplegable = document.getElementById('mu_name');
            let optBuit = document.createElement('option');
            clearSelects(3)
            optBuit.value = '-1';
            optBuit.innerText = '';
            desplegable.appendChild(optBuit);
            for (let mun of tag_mun){
                let codi = mun.children[0].textContent;
                let nom = mun.children[1].textContent;
                let opt = document.createElement('option');
                opt.value = codi;
                opt.innerText = nom;
                desplegable.appendChild(opt);
            }
            desplegable.removeAttribute('disabled');
        })
    })

    document.getElementById('pr_name').addEventListener('change', function (event) {
        ajaxClass.carregarContingut('/AjaxPost/Server/illes.php',
            'POST', 'codiProv=' + event.target.value, function (text) {
            let tag_ill = text.getElementsByTagName("illa");
            console.log(tag_ill);
            let desplegable;
            let label;
            let optBuit;
            clearSelects(2)
            if(tag_ill.length > 0){
                desplegable = document.getElementById('il_name');
                label = document.querySelector('[for="il_name"]');
                desplegable.style.visibility = 'visible';
                label.style.visibility = 'visible';
                optBuit = document.createElement('option');
                optBuit.value = '-1';
                optBuit.innerText = '';
                desplegable.appendChild(optBuit);
                for (let ill of tag_ill){
                    let codi = ill.children[0].textContent;
                    let nom = ill.children[1].textContent;
                    let opt = document.createElement('option');
                    opt.value = codi;
                    opt.innerText = nom;
                    desplegable.appendChild(opt);
                }
            }else{
                ajaxClass.carregarContingut('/AjaxPost/Server/municipisByProvincia.php',
                    'POST', 'codiProv=' + event.target.value, function (text) {
                    let tag_mun = text.getElementsByTagName("mun");
                    desplegable = document.getElementById('mu_name');
                    optBuit = document.createElement('option');
                    optBuit.value = '-1';
                    optBuit.innerText = '';
                    desplegable.appendChild(optBuit);
                    for (let mun of tag_mun){
                        let codi = mun.children[0].textContent;
                        let nom = mun.children[1].textContent;
                        let opt = document.createElement('option');
                        opt.value = codi;
                        opt.innerText = nom;
                        desplegable.appendChild(opt);
                    }
                    desplegable.removeAttribute('disabled');
                })
            }
        })
    })

    document.getElementById("ca_name").addEventListener('change',
        function (event) {

            ajaxClass.carregarContingut('/AjaxPost/Server/provinciesByComunitat.php',
                'POST', 'codiCom=' + event.target.value, function (text) {
                    console.log(text);
                    let tags_prov = text.getElementsByTagName("prov");
                    let desplegable = document.getElementById('pr_name');
                    let optBuit = document.createElement('option');
                    clearSelects(1)
                    optBuit.value = '-1';
                    optBuit.innerText = '';
                    desplegable.appendChild(optBuit);
                    for (let tag of tags_prov) {
                        let codi = tag.children[0].textContent;
                        let nom = tag.children[1].textContent;
                        let opt = document.createElement('option');
                        opt.value = codi;
                        opt.innerText = nom;
                        desplegable.appendChild(opt);
                    }
                    if(tags_prov.length == 0){
                        desplegable.setAttribute('disabled', false);
                        clearSelects(1);
                    }else{
                        desplegable.removeAttribute('disabled');
                    }
                })
    })
    ajaxClass.carregarContingut('/AjaxPost/Server/comunitats.php', 'GET', null, function (text) {
        let tags = text.getElementsByTagName("ca");
        let desplegable = document.getElementById('ca_name');
        let optBuit = document.createElement('option');
        optBuit.value = '-1';
        optBuit.innerText = '';
        desplegable.appendChild(optBuit);
        for (let tag of tags) {
            let codi = tag.children[0].textContent;
            let nom = tag.children[1].textContent;
            let opt = document.createElement('option');
            opt.value = codi;
            opt.innerText = nom;
            desplegable.appendChild(opt);
        }
    });

    function clearSelects(option){
        let pr_name = document.getElementById("pr_name");
        let mu_name = document.getElementById("mu_name");
        let il_name = document.getElementById("il_name");
        let label = document.querySelector('[for="il_name"]');
        switch (option){
            case 1:
                pr_name.options.length=0;
                mu_name.options.length=0;
                il_name.options.length=0;
                il_name.style.visibility = 'hidden';
                label.style.visibility = 'hidden';
                break;
            case 2:
                mu_name.options.length=0;
                il_name.options.length=0;
                il_name.style.visibility = 'hidden';
                label.style.visibility = 'hidden';
                break;
            case 3:
                break;
        }
    }

});

