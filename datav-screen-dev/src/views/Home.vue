<template>
  <div class="home">
    <loading v-if="loading">
      <div class="loading-text">Data big screen loading ...</div>
    </loading>
    <container :options="{width: 3840, height: 2160}" v-else>

      <div class="header">111</div>
      <div class="separator">222</div>

      <div class="center">
        <div class="left">
          <div class="left1">333</div>
          <div class="left2">444</div>
          <div class="left3">555</div>
          <div class="left4">666</div>
          <div class="left5">777</div>
          <div class="left6">888</div>
        </div>

        <div class="right">
          <div class="right-top1">999</div>
          <div class="right-top2">000</div>

          <div class="right-bottom">
            <div class="right-bottom-left">
              <div class="right-bottom-left1">b-111</div>
              <div class="right-bottom-left2">b-222</div>
              <div class="right-bottom-left3">b-333</div>
              <div class="right-bottom-left4">b-444</div>
            </div>

            <div class="right-bottom-right">
              <div class="right-bottom-right1">b-555</div>
              <div class="right-bottom-right2">b-666</div>
            </div>
          </div>
        </div>
      </div>
    </container>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
export default {
  name: 'Home',
  setup () {
    const loading = ref(false);

    onMounted(() => {
      setTimeout(() => {
        // loading.value = false;
      }, 2500);
    });

    return {
      loading
    };
  }
};
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgb(29,29,29);
  color: #fff;
  font-size: 48px;

  #my-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .header {
      width: 100%;
      height: 167px;
      background: yellow;
    }

    .separator {
      width: 100%;
      height: 10px;
      background: #000;
    }

    .center {
      width: 100%;
      flex: 1;
      display: flex;
      background: rebeccapurple;

      .left {
        flex: 0 0 860px;
        background: red;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 860px;
        height: 100%;
        padding-bottom: 20px;
        box-sizing: border-box;

        .left1 {
          height: 300px;
          background: green;
        }
        .left2 {
          height: 320px;
          background: yellowgreen;
        }
        .left3 {
          height: 280px;
          background: blueviolet;
        }
        .left4 {
          height: 230px;
          background: mediumaquamarine;
        }
        .left5 {
          height: 320px;
          background: pink;
        }
        .left6 {
          height: 360px;
          background: darkred;
        }
      }

      .right {
        flex: 1;
        background: blue;
        display: flex;
        flex-direction: column;

        .right-top1 {
          width: 100%;
          height: 206px;
          background: darkred;
        }
        .right-top2 {
          width: 100%;
          height: 48px;
          background: cadetblue;
        }

        .right-bottom {
          flex: 1;
          display: flex;
          padding-bottom: 20px;

          .right-bottom-left {
            flex: 0 0 1917px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 1917px;

            .right-bottom-left1 {
              height: 999px;
              background: red;
            }
            .right-bottom-left2 {
              height: 80px;
              background: yellowgreen;
            }
            .right-bottom-left3 {
              height: 350px;
              background: deepskyblue;
            }
            .right-bottom-left4 {
              height: 220px;
              background: orangered;
            }
          }

          .right-bottom-right {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 10px;

            .right-bottom-right1 {
              width: 100%;
              height: 999px;
              background: burlywood;
            }
            .right-bottom-right2 {
              width: 100%;
              flex: 1;
              margin-top: 20px;
              background: darkgreen;
            }
          }
        }
      }
    }
  }
}

.loading-text {
  font-size: 20px;
}

</style>
