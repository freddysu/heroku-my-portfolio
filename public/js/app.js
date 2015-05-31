var model = {
	currentProject: null,
	projects: [
		{
			name: 'Ubike 讓我騎',
			description: 'I was responsible for Android developement of this project while I was doing my internship in <a href="http://www.chocolabs.com/">CHOCOLABS</a>. The app is aim at providing user friendly interfaces and real time information which includes the stop locations, distance and navigation to a stop from current location, the number of bikes, spaces, the estimated waiting time for a bike, timer, and even the weather infomatiom, etc. The app leveages Google Maps API and Google Street View API for providing users best services.',
			imgSrc: 'img/ubike',
			projectLink: 'https://play.google.com/store/apps/details?id=com.chocolabs.ubike',
			linkImg: 'https://developer.android.com/images/brand/en_app_rgb_wo_60.png',
			numOfImg: 5,
			orientation: 'portrait',
			achievement: '<ul><li>Wins the 11th Public Departmental Resources Application Award hosted by Industrial Development Bureau, MOEA</li><li>Downloads: 50,000 ~ 100,000</li></ul>'
		},
		{
			name: 'MAM (Mobile Application Management)',
			description: 'This is a system based on client-server architecture and graph database to analyze the capability of each application. Starting from the configuration extractor in mobile device, first step is to extract APKs and system information and upload to server through web server Rest API interface. After a bunch of APK decompiling, analysis and parsing tasks, the information is organized and structured in configuration graph database. Finally, our system reports the device configuration information and potential vulnerability back to the user. The web server, APKs analyser, graph database are implemented by NodeJS, Python and Neo4j respectively.',
			imgSrc: 'img/mam',
			projectLink: null,
			linkImg: null,
			numOfImg: 5,
			orientation: 'landscape',
			achievement: ''
		},
		{
			name: 'Hoppa Ellie',
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
	  			<div class="row"> \
	  				<div class="col-md-2 portfolio-item"> \
		  				<a href="#portfolioModal" class="portfolio-link" data-toggle="modal"> \
	  						<div class="caption"> \
	  							<div class="caption-content"> \
	  								<i class="fa fa-search-plus fa-3x"></i> \
	  							</div> \
	  						</div> \
	  						<img id="project-img" class="portfolio-img img-responsive" src="' + project.imgSrc + '.png' + '"> \
	  					</a> \
	  				</div> \
	  				<div class="col-md-10"> \
		  				<h4 class="project-name">' + project.name + '</h4> \
		  				<span class="project-description">' + project.description + project.achievement + '</span> \
	  				</div> \
	  			</div>'
			

			if (project.projectLink != null) {
				rowStr +=  '<div class="row link-div"> \
								<a class="project-link" href="' + project.projectLink + '"> \
									<img class="link-img" alt="Android app on Google Play" src="' + project.linkImg + '"/> \
								</a> \
							</div>';
				appendHrAndLi(i, projects.length);
			} else {
				appendHrAndLi(i, projects.length);
			}

			newProjectRow = this.createElement(rowStr);
			
			elem = newProjectRow.getElementsByTagName("a")[0];
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
		this.closeModalElem.addEventListener('click', function(){
			document.getElementById('slide1').checked = true;
			document.getElementById('slide2').checked = false;
			document.getElementById('slide3').checked = false;
			document.getElementById('slide4').checked = false;
			document.getElementById('slide5').checked = false;
		});
	},

	render: function(){
		var modalStr = '';
		var project = octopus.getCurrentProject();
		var inputElem, labelElem;

		this.innerElem.innerHTML = '';
		
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
								<img class="img-responsive" src="' + project.imgSrc + i + '.png" alt=""> \
							</article>';
		}		
		console.log(modalStr);
		this.innerElem.innerHTML = modalStr;
	}
}

octopus.init(function(){
	
	//console.log("Dynamically loading js&css");
	loadjscssfile("css/style.css", "css")

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

