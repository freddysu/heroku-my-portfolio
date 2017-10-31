var model = {
	currentProject: null,
	projects: [
		{
			name: 'Arcade Web',
			tag: 'JavaScript, React, Redux',
			description: 'Arcade web provides Omlet users for viewing their own posts including screenshots and videos uploaded from <a target="_blank" href=https://play.google.com/store/apps/details?id=mobisocial.arcade&hl=zh_TW>Omlet Arcade</a>, which is a live streaming and game recording app for mobile devices. It also provides users the hottest and latest posts from other game players. I was in charge of the front-end development of Arcade web with my colleague while working at <a target="_blank" href="https://arcade.omlet.me/">Omlet Inc.</a> and is implemented by React & Redux.',
			imgSrc: 'img/arcadeweb',
			projectLink: null,
			linkImg: null,
			numOfImg: 5,
			orientation: 'landscape',
			achievement: ''
		},
		{
			name: 'Automated Testing System',
			tag: 'JavaScript, React, NodeJS, MongoDB, Calabash, Cucumber',
			description: 'The system helps our QA to run <a target="_blank" href="http://calaba.sh/">Calabash</a> testing on multiple devices simultaneously without knowing the Calabash commands. It makes QA to be more efficient at running commands and reviewing the test reports by providing a friendly web UI. I was responsible for this project at <a target="_blank" href="https://arcade.omlet.me/">Omlet Inc</a>.',
			imgSrc: 'img/autotest',
			projectLink: null,
			linkImg: null,
			numOfImg: 5,
			orientation: 'landscape',
			achievement: ''
		},
		{
			name: 'Crawlers Monitor',
			tag: 'JavaScript, AngularJS, NodeJS, MongoDB',
			description: 'It\'s a crawlers monitor system I built by the time I was doing my summer internship (July 2015 - Sep. 2015) at <a target="_blank" href="http://www.thetrigger.io/">MobiusBobs</a>. Since we have lots of crawlers need to manage, it\'s really inconvenient to do all the operations with shell commands. The purpose of this system is to ease the pain of operating and monitoring crawlers by providing a web UI. Operations include signup, login/logout authentication, connecting to a target server by ssh, creating/removing/listing the crawlers, doing git pull/checkout, etc. The system is implemented by MEAN (MongoDB, Express, AngularJS, NodeJS).',
			imgSrc: 'img/monitor',
			projectLink: null,
			linkImg: null,
			numOfImg: 5,
			orientation: 'landscape',
			achievement: ''
		},
		{
			name: 'Let\'s Ubike (Ubike 讓我騎)',
			tag: 'Java, Android',
			description: 'I was responsible for Android developement of this project while doing my internship (July 2013 - Jan. 2014) at <a target="_blank" href="http://www.chocolabs.com/">CHOCOLABS</a>. The app aims at providing user-friendly interfaces and real time information such as stops location, distance, navigation, number of available bikes, spaces, estimated waiting time, timer. The app leverages Google Maps and Google Street View API to provide users the best service.',
			imgSrc: 'img/ubike',
			projectLink: 'https://play.google.com/store/apps/details?id=com.chocolabs.ubike',
			linkImg: 'https://developer.android.com/images/brand/en_app_rgb_wo_60.png',
			numOfImg: 5,
			orientation: 'portrait',
			achievement: '<ul><li>Wins the 11th Public Departmental Resources Application Award hosted by Industrial Development Bureau, MOEA</li><li>Downloads: 50,000 ~ 100,000</li></ul>'
		},
		{
			name: 'Mobile Application Management',
			tag: 'JavaScript, Python, NodeJS, Neo4j',
			description: 'This is a system based on the client-server architecture and a graph database to analyze the capability of each application in a mobile device. The configuration extractor installed in the mobile device extracts APKs and system information, and uploads them to the server via web server Rest API interface. After a series of APK decompiling, analysis and parsing tasks, the information is organized and structured in the configuration graph database. Lastly, our system reports the device configuration information and potential vulnerabilities back to the user. The web server, APKs analyser, graph database are implemented by NodeJS, Python and Neo4j respectively.',
			imgSrc: 'img/mam',
			projectLink: null,
			linkImg: null,
			numOfImg: 5,
			orientation: 'landscape',
			achievement: ''
		},
		{
			name: 'Hoppa Ellie',
			tag: 'C#, Unity3D', 
			description: 'This is our game project from Software Engineering Process at Chalmer University of Technology. This game is built by Unity3D engine version 5.01. In this game, the player control the role, Ellie, to explore the world and reach the end goal. Hoppa Ellie is similar to SuperMario. The main difference is that player is not allow to stop Ellie from running but can only make Ellie jump over all the dangers coming to her.',
			imgSrc: 'img/hoppa',
			projectLink: null,
			linkImg: null,
			numOfImg: 5,
			orientation: 'landscape',
			achievement: ''
		}
	]
};

var octopus = {

	init: function(callback){
		model.currentProject = model.projects[0];	
		projectListView.init();
		portfolioModalView.init();
		callback && callback();
	},

	getCurrentProject: function(){
		return model.currentProject;
	},

	getProjects: function() {
		return model.projects;
	},

	setCurrentProject: function(project){
		model.currentProject = project 
	}
}


var projectListView = {

	init: function(){
		this.projectListElem = document.getElementById('project-list');
		
		this.render();
	},

	render: function(){
		var project, i, rowStr, newProjectRow, elem;
		var projects = octopus.getProjects();

		this.projectListElem.innerHTML = '';

		for (i=0; i<projects.length; i++){
			project = projects[i];

			rowStr = '<li> \
	  			<div class="row project-row" data-target="#portfolioModal" class="portfolio-link" data-toggle="modal"> \
	  				<div class="col-md-2 portfolio-item"> \
  						<img id="project-img" class="portfolio-img img-responsive" src="' + project.imgSrc + '.png' + '"> \
	  				</div> \
	  				<div class="col-md-10 unselectable"> \
		  				<span class="project-name">' + project.name + '</span> \
		  				<span class="project-tag"> - ' + project.tag + '</span> \
		  				<div class="project-description">' + project.description + project.achievement + '</div> \
	  				</div>'

			

			if (project.projectLink != null) {
				rowStr +=  '<div class="pull-right link-div"> \
								<a class="project-link" target="_blank" href="' + project.projectLink + '"> \
									<img class="link-img" alt="Android app on Google Play" src="' + project.linkImg + '"/> \
								</a> \
							</div> \
						</div>';
				appendHrAndLi(i, projects.length);
			} else {
				rowStr += '</div>';
				appendHrAndLi(i, projects.length);
			}

			newProjectRow = this.createElement(rowStr);
			
			elem = newProjectRow.getElementsByClassName("project-row")[0];
			elem.addEventListener('click', (function(projectCopy){
				return function(){
					octopus.setCurrentProject(projectCopy);
					portfolioModalView.render();
				};
			})(project));
			
			this.projectListElem.appendChild(newProjectRow);
			
		}

		function appendHrAndLi(i, len){
			if (i == len-1){
				rowStr += '</li>';
			} else {
				rowStr += '<hr></li>';
			}
		}
	},

	createElement: function(str) {
		//console.log("c1: ");
		var div = document.createElement('div');
		div.innerHTML = str;
		return div.childNodes[0];
	}
}

var portfolioModalView = {
	
	init: function(){
		this.innerElem = document.getElementById('inner');

		this.modalContentElem = document.getElementById('modal-content');
		this.slideLeftElem = document.getElementById('slide-left');
		this.slideCenterElem = document.getElementById('slide-center');
		this.slideRightElem = document.getElementById('slide-right');

		this.closeModalElem = document.getElementById('close-modal');
	},

	render: function(){  
		var modalStr = '';
		var project = octopus.getCurrentProject();
		var inputElem, labelElem;

		this.innerElem.innerHTML = '';
    this.resetSlides();
		
		if (project.orientation == 'portrait'){
			this.modalContentElem.className = 'modal-content';
			this.slideLeftElem.className = 'col-md-4';
			this.slideCenterElem.className = 'col-md-4';
			this.slideRightElem.className = 'col-md-4';
		} else if (project.orientation == 'landscape'){
			this.modalContentElem.className += " top-margin";
			this.slideLeftElem.className = 'col-md-2';
			this.slideCenterElem.className = 'col-md-8';
			this.slideRightElem.className = 'col-md-2';
		}

		for (var i = 0; i < project.numOfImg; i++){
			modalStr +=    '<article> \
								<img class="img-responsive" src="' + project.imgSrc + i + '.jpg" alt=""> \
							</article>';
		}		
		// console.log(modalStr);
		this.innerElem.innerHTML = modalStr;
	},

  resetSlides: function() {
    document.getElementById('slide1').checked = true;
    document.getElementById('slide2').checked = false;
    document.getElementById('slide3').checked = false;
    document.getElementById('slide4').checked = false;
    document.getElementById('slide5').checked = false;
  }
}

octopus.init(function(){
	
	//console.log("Dynamically loading js&css");
	//loadjscssfile("css/style.css", "css")

	function loadjscssfile(filename, filetype){
		if (filetype=="js"){ // if filename is a external JavaScript file
			var fileref = document.createElement('script');
			fileref.setAttribute("type","text/javascript");
			fileref.setAttribute("src", filename);
		}
		
		else if (filetype=="css"){ // if filename is an external CSS file
			var fileref = document.createElement("link");
			fileref.setAttribute("rel", "stylesheet");
			fileref.setAttribute("type", "text/css");
			fileref.setAttribute("href", filename);
		}

		if (typeof fileref!="undefined")
			document.getElementsByTagName("head")[0].appendChild(fileref);
	}
});


