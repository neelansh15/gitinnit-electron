<template>
  <div>
    <!--Right Div-->
    <div class="col s6">
      <!--Top buttons Div-->
      <div>
        <button>
          <nuxt-link to="/details" exact>
            Retrive changes from repo
          </nuxt-link>
        </button>
        <button>
          <nuxt-link to="/details" exact>
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
</template>

<script>

</script>

<style>
  ul {
    list-style: none;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .col {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 90vh;
    margin: 0 2rem 0 2rem;
  }

  .generalLinks {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .userInfo {
    display: flex;
  }

  a {
    text-decoration: none;
    color: black;
  }
</style>
