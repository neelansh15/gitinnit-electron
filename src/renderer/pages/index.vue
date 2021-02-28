<template>
  <div>
    <!--Left div-->
    <div class="row">
      <div class="col s6">
        <div class="userInfo">
          <h3>img</h3>
          <h3>Username</h3>
        </div>
        <div class="generalLinks">
				<!--Vertical Nav-->
					<h3>General</h3>
					<ul>
						<li>Home</li>
						<li>Projects</li>
						<li>
							<button>
								<nuxt-link
                  to="/push"
                  exact
                >
                  Start a project
                </nuxt-link>
							</button>
						</li>
						<li>Manage Samples</li>
					</ul>
        </div>
        <div class="accountLinks">
					<h3>Account</h3>
					<ul>
						<li>Sign out</li>
					</ul>
				</div>
			</div>

			<!--Right Div-->
			<div class="col s6">
				<!--Top buttons Div-->
				<div>
					<button>
            <nuxt-link
              to="/push"
              exact
            >
              Retrive changes from repo
            </nuxt-link>
          </button>
          <button>
            <nuxt-link
              to="/push"
              exact
            >
              Apply changes to repo
            </nuxt-link>
          </button>
				</div>
				<!-- Recent Projects -->
				<div>
					<ul>
						<!--li will be cards -->
						<li>Project 1</li>
						<li>Project 2</li>
						<li>Project 3</li>
					</ul>
				</div>
			</div>
		</div>
  </div>
</template>

<script>

export default {

}
</script>

<style>
ul{
  list-style: none;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.col{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 90vh;
  margin: 0 2rem 0 2rem;
}

.generalLinks{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.userInfo{
  display: flex;

}

a{
  text-decoration: none;
  color: black;
}

</style>
