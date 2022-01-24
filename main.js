const userName = document.querySelector(".search-profile");
const btnSearch = document.querySelector(".get-button");
const profile = document.querySelector(".show-profile");
const profileOwn = document.querySelector(".owner");
const reposProfile = document.querySelector(".repos");

userName.addEventListener("keydown", () => {
  reposProfile.innerHTML = "";
  profileOwn.innerHTML = ""
});

btnSearch.addEventListener("click", () => {
  // GITHUB PROFILE
  if (userName.value == "") {
    profile.innerHTML = `Please Enter Github userName`;
  } else {
    const apiGithub = `https://api.github.com/users/${userName.value}`;
    async function githubProfile() {
      const response = await fetch(apiGithub);
      const profileOwner = await response.json();
     
      //     GET PROFILE
      profileOwn.innerHTML = `
        <div class="avatar">
          <img src=${profileOwner.avatar_url} alt="avatar">   
        </div>
        <div class="profile-name"><h3>${profileOwner.login}</h3></div>
        <div class="follow">
          <div class="followers">
            followers
            <p>${profileOwner.followers}</p>
          </div>
          <div class="following">
            following
            <p>${profileOwner.following}</p>
          </div>
        </div>`;

      //   GET LINK OF GITHUB REPOS
      const githubRepos = profileOwner.repos_url;
      async function Repos() {
        const resp = await fetch(githubRepos);
        const profileRepos = await resp.json();
        const numberOfrepos = profileRepos.length;

        //  LOOP  THROUGH  REPOS

        profileRepos.forEach((repo) => {
          const nameProject = repo.name;
          const codeProject = repo.html_url;
          const liveProject = `https://${profileOwner.login}.github.io/${nameProject}/`;

          //       CREATE ELEMENT FOR PROJECTS
          let box = document.createElement("div");
          box.classList.add("box");
          let h3 = document.createElement("h3");
          h3.textContent = nameProject;
          let a = document.createElement("a");
          a.textContent = "Source Code";
          a.classList.add("visit");
          a.setAttribute("href", codeProject);
          a.setAttribute("target", "_blank");
          
         
          let live = document.createElement("a");
          live.textContent = "Live";
          live.classList.add("Live");
          live.setAttribute("href",liveProject);
          live.setAttribute("target", "_blank");
          

          box.appendChild(h3);
          box.appendChild(a);
          box.appendChild(live);
          reposProfile.appendChild(box);
        });
      }
      Repos();
    }
    githubProfile();
  }
});
