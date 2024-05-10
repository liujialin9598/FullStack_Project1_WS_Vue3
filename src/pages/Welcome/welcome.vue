<template>
  <div class="welcome-page">
    <h1>Welcome to the Windlestone Model Simulation Website</h1>
    <p>
      This website is designed to simulate various models created by
      Windlestone. Please select the desired simulation from the Workspace menu
      in the top right corner.
    </p>

    <div class="desc">
      <h2>In Simulation 1 :</h2>
      <ul>
        <li>
          The representative member has their superannuation (pension fund)
          invested in the standard product.
        </li>
        <li>The representative member is female.</li>
      </ul>

      <h2>In Simulation 2 :</h2>
      <ul>
        <li>
          Everything in the model is the same as Simulation 1, except for the
          following:
        </li>
        <li>
          The return on the members balance each year, rt, is now inflation + 1%
          guaranteed by the superannuation fund.
        </li>
        <li>
          That is, Simulation 2 is the same as Simulation 1 except that return
          is now not its own draw from a normal distribution, but instead
          <code>rt = Inft + 0.01</code>.
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.welcome-page {
  width: 800px;
  margin: 0 auto; /* Center the content horizontally */
  text-align: center;
  margin-top: 50px;
}

.welcome-page h1 {
  font-size: 24px;
}

.desc {
  width: 600px;
  margin-left: 100px;
}

.welcome-page h2 {
  font-size: 20px;
  margin-top: 20px;
  text-align: left;
}

.welcome-page p {
  font-size: 18px;
  margin-top: 20px;
  color: #333;
}

.welcome-page ul {
  list-style-type: disc;
  margin-left: 20px;
  text-align: left;
}
</style>
