$(document).ready(function () {
            console.clear();
            localStorage.setItem('count', 5);
            getLaunches(5);
        }); 
        $(window).on('beforeunload', function() {
            $(window).scrollTop(0);
        });

        function callLaunches() {
            var c = parseInt(localStorage.getItem('count'));
            c += 3;
            localStorage.setItem('count', c);
            console.log(c);
            getLaunches(c);
            // console.clear();
        }

        
        function getLaunches(count) {
            const uri = 'https://launchlibrary.net/1.4/launch/next/' + count;
            fetch(uri).then((resp) => resp.json())
            .then(function(resp) {
                console.log(resp);
                if(!resp) {
                    alert('No data received, please try again later!')
                }

                $('#launch_details').html('');
                
                resp.launches.forEach(element => {
                    var card = '<div id="launch_cards" class="launch_cards">';
                    card += '<div id="card_details" class="card_details" style="float:left; width: 55%;">';
                    card += '<p class="rocket-name"><strong>' + element.name + '</strong></p>';
                    card += '<p class="rocket_window" id="rocket-start-window">Launch window starts at ' + element.windowstart + '</p>';
                    card += '<p class="rocket_window" id="rocket-end-window">Launch window ends at ' + element.windowend + '</p>';
                    card += '<div class="launch_from" id="launching-from">';
                    
                    var wikiUrl = 'https://www.google.com/?q='+element.location.name;
                    var mapUrl = 'https://www.google.com/?q='+element.location.name+'map';
                    if(element.location.pads.length > 0) {
                        if (element.location.pads[0].wikiURL) {
                        wikiUrl = element.location.pads[0].wikiURL;
                        }
                        if (element.location.pads[0].mapURL) {
                            mapUrl = element.location.pads[0].mapURL;
                        }
                    }
                    
                    card += '<span><strong>Launching From :</strong></span> &nbsp; <a target="_blank" href="' +wikiUrl + '" id="rocket-launch">' + element.location.name + '</a>&nbsp;|&nbsp;<a target="_blank" href="' + mapUrl + '" id="rocket-map"><i class="fa fa-map-marker" aria-hidden="true"></i></a>';
                    card += '</div>';
                    card += '<div class="launch_agencies" id="launch-agencies">';
                    // card += '<p><strong>Launch Details</strong></p>';
                    if (element.missions.length > 0) {
                        if (element.missions[0].agencies != null) {
                        element.missions[0].agencies.forEach(elements => {
                            card += '<p><strong> Launch Agency : </strong> ' + elements.name + '</p>';
                        });
                    }
                    card += '<p><span><strong> Mission name : </strong></span>'+element.missions[0].name+'</p>';
                    

            
            
            if (!element.missions[0].wikiURL) {
                element.missions[0].wikiURL = 'https://www.google.com/?q='+element.missions[0].name+'+'+'wiki';
            }
            card += '<p class="launch_agencies mission_desc">'+element.missions[0].description+'<a target="_blank" style="text-decoration: none; font-size: small; opacity: 0.8;" href=' + element.missions[0].wikiURL + '>..more</a>'+'</p>';
                    
            card += '</div>';
            card += '<div id="lsp" class="launch_agencies">';
            card += '<span class="description-p"><strong>Launch Service Provider:</strong></span>&nbsp;<a target="_blank" class="description-p" href="' + element.lsp.wikiURL + '">' + element.lsp.name + '</a>';
            card += '</div>';
            if (element.missions[0].payloads.length > 0) {
                card += '<div class="launch_agencies" id="payloads">';
                    card += '<p><strong>Payload:</strong></p>'
                    card += '<ul id="payload-list">';
                element.missions[0].payloads.forEach(elements => {
                    
                    card += '<li>' + elements.name + '</li>';
                });
                card += '</ul>';
                    card += '</div>';
            }
                    }
            if (element.vidURLs.length != 0) {
                card += '<div class="launch_agencies">';
                card += '<p><strong>Live Stream:</strong></p>';
                card += '<ul id="payload-list">';
                element.vidURLs.forEach(elements => {
                    card += '<li><a target="_blank" href="' + elements + '">'+elements+'</a></li>';
                });
                card += '</ul>';
                card += '</div>';
            }
            
            card += '</div>';
            card += '<div id="card_image" style="float: right; background-size: contain; width: 35%; height: 350px; text-align: right;">'
            card += '<img  style=" max-width: calc(100% - 10px); height: inherit; "  alt="Rocket" src="'+element.rocket.imageURL+'">';
            card += '</div>';
            card += '</div>';
            document.getElementById('launch_details').innerHTML += card;
            
                });                
            });
        }