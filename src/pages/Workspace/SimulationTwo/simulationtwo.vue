<template>
  <div class="page" v-loading="loading">
    <!-- #region multiple simulation -->

    <!-- #region Output Distributions -->
    <h1>Simulation output distribution</h1>
    <br /><br />
    <p>
      The following graphs illustrate the distribution of lifetime well-being
      and the distribution of age at death across these simulations.
    </p>
    <br />
    <div class="bars">
      <div class="basicbar">
        <BasicBar
          :xdata="getUniqueSortedValues(multiResultData, 'W+Y', 5)"
          :ydata="getCountListForValues(multiResultData, 'W+Y', 5)"
          xname="Lifetime Well-being"
          title="Lifetime Well-being distribution"
          right_grid="25%"
        ></BasicBar>
      </div>
      <div class="basicbar">
        <BasicBar
          :xdata="getUniqueSortedValues(multiResultData, 'Age', 1)"
          :ydata="getCountListForValues(multiResultData, 'Age', 1)"
          xname="Age at death"
          title="Age distribution"
          right_grid="25%"
        ></BasicBar>
      </div>
    </div>
    <!-- #endregion -->

    <!-- #region Lifetime Well-being -->
    <h1>Lifetime Well-being</h1>
    <p>
      This is a boxplot showing the results of
      {{ localapiData["simulationtimes"]["value"] }} simulations.
    </p>
    <div class="charts33">
      <div class="DataTransformSimpleAggregate">
        <DataTransformSimpleAggregate
          :xdata="multiResultData.map((i:any) => i['Age'])"
          :ydata="multiResultData.map((i:any) => i['W+Y'])"
          :yname="'Lifetime Well-being'"
          :xname="'Age at death'"
        ></DataTransformSimpleAggregate>
      </div>
      <div class="parameters">
        <p>You can modify the parameters here.</p>
        <br />
        <p>Simulation times</p>
        <el-input
          @keyup.enter="onSubmitMulti"
          v-model="apiData.simulationtimes.value"
          :parser="(value:any) => value.replace(/\$\s?|(,*)/g, '')"
          :formatter="(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :validate-event="true"
        />

        <el-button class="button" @click="onSubmitMulti"
          >Perform simulation</el-button
        >
      </div>
    </div>
    <!-- #endregion -->

    <!-- #endregion -->
    <br /><br />
    <hr />
    <br /><br />
    <!-- #region Single simulation -->

    <!-- #region Lifetime Well-being -->
    <h1>Lifetime Well-being</h1>
    <div class="charts2">
      <div class="function">
        <div style="text-align: left">
          <img
            style="height: 50px"
            src="@/assets/formulars/Lifetime Wellbeing.png"
            alt="Lifetime Well-being"
          />
        </div>
        <br />
        <div>
          <Formular
            :formula="[
              ['W<sub>L</sub>', 'Lifetime Well-being'],
              ['w<sub>t</sub>', 'Income Well-being in year t'],
              ['Y<sub>T</sub>', 'Bequest Well-being in year T'],
              ['T', 'Year of death'],
            ]"
            :left_length="0.3"
          ></Formular>
        </div>
      </div>
      <div class="charts">
        <SmoothedLineChart
          :xdata="oneResultData.map((i:any) => i.Age)"
          :ydata="oneResultData.map((i:any) => i['W'])"
          title="Lifetime Well-being"
          :yAxisMinMax="[0, 120]"
          xname="Age"
        ></SmoothedLineChart>
      </div>
      <div class="parameters">
        <el-button
          class="button"
          @click="onSubmitOne"
          style="margin-bottom: 50px; margin-left: 20px"
          >Perform simulation</el-button
        >
      </div>
    </div>
    <br /><br />
    <!-- #endregion -->

    <!-- #region Well-being  -->
    <h1>Well-being functions</h1>
    <br />
    <p><b>Well-being each year</b></p>
    <div class="charts2">
      <div class="function">
        <div style="text-align: left">
          <img
            style="height: 100px"
            src="@/assets/formulars/Wellbeing functions.png"
            alt="Well-being functions"
          />
        </div>
        <br />
        <div>
          <Formular
            :formula="[
              ['w<sub>t</sub>', 'Income Well-being in year t'],
              ['P<sub>t</sub>', 'Price index level  at the end of year t'],
              ['I<sub>t</sub>', 'Income paid to the member during year t'],
              ['ρ', 'Risk aversion parameter 0 < ρ < 1'],
              ['K<sub>1</sub>', 'Risk aversion additive parameter for income'],
            ]"
            :left_length="0.3"
          ></Formular>
        </div>
      </div>
      <!-- 图表区 -->
      <div style="display: flex; flex-direction: column; width: 700px">
        <div style="display: flex">
          <div class="charts" style="width: 350px">
            <BasicBar
              :xdata="oneResultData.map((i:any) => i.Age)"
              :ydata="oneResultData.map((i:any) => i['w'])"
              title="Lifetime Well-being"
              :yAxisMinMax="[0, 4]"
              xname="Age"
            ></BasicBar>
          </div>
          <div class="charts" style="width: 350px">
            <wellbeingScatter
              :xdata="oneResultData.map((i:any) => i['I(t)/P'])"
              :ydata="oneResultData.map((i:any) => i['w'])"
              title="Lifetime Well-being"
              :yAxisMinMax="[0, 4]"
              xname="I(t)/P"
              :ρ="apiData.ρ.value"
              :K1="apiData.K1.value"
            ></wellbeingScatter>
          </div>
        </div>
        <!-- 参数区 -->
        <div
          class="parameters2"
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: end;
          "
        >
          <div>
            <p>ρ</p>
            <el-input
              @keyup.enter="onSubmitOne"
              v-model="apiData.ρ.value"
              style="width: 150px"
            />
          </div>
          <div>
            <p>K<sub>1</sub></p>
            <el-input
              @keyup.enter="onSubmitOne"
              v-model="apiData.K1.value"
              style="width: 150px"
            />
          </div>
          <div>
            <el-button class="button" @click="onSubmitOne"
              >Perform simulation</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <br /><br />
    <!-- #endregion -->

    <!-- #region Bequest  -->
    <p><b>Bequest</b></p>
    <div class="charts2">
      <div class="function">
        <div style="text-align: left">
          <img
            style="height: 100px"
            src="@/assets/formulars/Bequest.png"
            alt="Bequest functions"
          />
        </div>
        <br />
        <div>
          <Formular
            :formula="[
              [
                'B<sub>T</sub>',
                'Member’s balance at the end of the year in which they die, year T',
              ],
              ['P<sub>T</sub>', 'Price index level at the end of year T'],
              ['γ', 'Risk aversion parameter 0 < ϒ < 1'],
              ['K<sub>2</sub>', 'Risk aversion scaling parameter for bequest'],
            ]"
            :left_length="0.3"
          ></Formular>
        </div>
      </div>
      <!-- 图表区 -->
      <div style="display: flex; flex-direction: column; width: 700px">
        <div style="display: flex">
          <div class="charts" style="width: 350px">
            <BasicBar
              :xdata="oneResultData.map((i:any) => i.Age)"
              :ydata="oneResultData.map((i:any) => i['Y'])"
              title="Bequest Well-being"
              xname="Age"
            ></BasicBar>
          </div>
          <div class="charts" style="width: 350px">
            <bequestScatter
              :xdata="oneResultData.map((i:any) => i['B/P'])"
              :ydata="oneResultData.map((i:any) => i['Y'])"
              title="Bequest"
              xname="B(t)/P"
              :ρ="apiData.γ.value"
              :K1="apiData.K2.value"
            ></bequestScatter>
          </div>
        </div>
        <!-- 参数区 -->
        <div
          class="parameters2"
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: end;
          "
        >
          <div>
            <p>γ</p>
            <el-input
              @keyup.enter="onSubmitOne"
              v-model="apiData.γ.value"
              style="width: 150px"
            />
          </div>
          <div>
            <p>K<sub>2</sub></p>
            <el-input
              @keyup.enter="onSubmitOne"
              v-model="apiData.K2.value"
              style="width: 150px"
            />
          </div>
          <div>
            <el-button class="button" @click="onSubmitOne"
              >Perform simulation</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <br /><br />
    <!-- #endregion -->

    <!-- #region Income  -->
    <h1><b>Income</b></h1>
    <div class="charts2">
      <div class="function">
        <div style="text-align: left">
          <img
            style="height: 70px"
            src="@/assets/formulars/income.png"
            alt="Income functions"
          />
        </div>
        <br />
        <div class="formular">
          <Formular
            :formula="[
              ['I<sub>t</sub>', 'Income paid to the member during year t'],
              [
                'LE<sub>t</sub>',
                'Life expectancy:  Expected number of remaining years of the member’s life at time t',
              ],
              ['B<sub>t</sub>', 'Members balance at t'],
              ['PR<sub>t</sub>', 'Pension received in year t'],
            ]"
            :left_length="0.3"
          ></Formular>
        </div>
      </div>
      <div class="charts">
        <SmoothedLineChart
          :xdata="oneResultData.map((i:any) => i.Age)"
          :ydata="oneResultData.map((i:any) => i['I(t)'])"
          title="Income in each year"
          xname="Age"
        ></SmoothedLineChart>
      </div>
      <div class="parameters">
        <p>B<sub>0</sub></p>
        <el-input
          @keyup.enter="onSubmitOne"
          v-model="apiData.Bt.value"
          :parser="(value:any) => value.replace(/\$\s?|(,*)/g, '')"
          :formatter="(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
        />
        <br />

        <el-button
          class="button"
          @click="onSubmitOne"
          style="margin-bottom: 50px; margin-left: 20px"
          >Perform simulation</el-button
        >
      </div>
    </div>
    <!-- #endregion -->

    <!-- #region  Pension-->
    <div class="pension" style="border: 1px dashed #ccc; border-radius: 10px">
      <br />
      <!-- #region Pension Received  -->
      <h1><b>Pension Received</b></h1>
      <div class="charts2">
        <div class="function">
          <div style="text-align: left">
            <img
              style="height: 30px"
              src="@/assets/formulars/PR.png"
              alt="Income functions"
            />
          </div>
          <br />
          <div class="formular">
            <Formular
              :formula="[
                ['PR<sub>t</sub>', 'Pension received in year t'],
                ['Pen<sub>t</sub>', 'Max annual pension payment in year t'],
                [
                  'Loss<sub>t</sub>',
                  'Loss of pension due to pension assets test in year t',
                ],
                ['B<sub>t</sub>', 'Members balance at year t'],
                ['AT<sub>min</sub>', 'Pension asset test minimum'],
                ['AT<sub>max</sub>', 'Pension asset test maximum'],
                ['RWG', 'Real Wage Growth '],
              ]"
              :left_length="0.6"
            ></Formular>
          </div>
        </div>
        <div class="charts">
          <SmoothedLineChart
            :xdata="oneResultData.map((i:any) => i.Age)"
            :ydata="oneResultData.map((i:any) => i['PR(t)'])"
            title="Pension received each year"
            xname="Age"
          ></SmoothedLineChart>
        </div>
        <div class="parameters">
          <p>B<sub>0</sub></p>
          <el-input
            @keyup.enter="onSubmitOne"
            v-model="apiData.Bt.value"
            :parser="(value:any) => value.replace(/\$\s?|(,*)/g, '')"
            :formatter="(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          />
          <br />
          <p>AT<sub>min</sub></p>
          <el-input
            @keyup.enter="onSubmitOne"
            v-model="apiData.AT_min.value"
            :parser="(value:any) => value.replace(/\$\s?|(,*)/g, '')"
            :formatter="(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          />
          <br />
          <p>AT<sub>max</sub></p>
          <el-input
            @keyup.enter="onSubmitOne"
            v-model="apiData.AT_max.value"
            :parser="(value:any) => value.replace(/\$\s?|(,*)/g, '')"
            :formatter="(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          />
          <br />
          <p>RWG</p>
          <el-input @keyup.enter="onSubmitOne" v-model="apiData.RWG.value" />
          <br />

          <el-button
            class="button"
            @click="onSubmitOne"
            style="margin-bottom: 50px; margin-left: 20px"
            >Perform simulation</el-button
          >
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region 3 Pension functions  -->
      <div class="charts2" style="margin-top: 0px">
        <div class="function pen">
          <h1><b>Pension</b></h1>

          <div style="text-align: left; margin-top: 10px">
            <img style="height: 30px" src="@/assets/formulars/pen.png" />
          </div>
          <br />

          <div
            class="charts"
            style="width: 330px; margin-left: 0; margin-top: 50px"
          >
            <SmoothedLineChart
              :xdata="oneResultData.map((i:any) => i.Age)"
              :ydata="oneResultData.map((i:any) => i['Pen(t)'])"
              title="Pension"
              xname="Age"
            ></SmoothedLineChart>
          </div>
        </div>

        <div class="function balance" style="margin-left: 30px">
          <h1><b>Balance</b></h1>

          <div style="text-align: left">
            <img
              style="height: 50px"
              src="@/assets/formulars/balance.png"
              alt="Income functions"
            />
          </div>
          <br />
          <div
            class="charts"
            style="
              width: 330px;
              height: 300px;
              margin-top: 40px;
              margin-left: 0;
            "
          >
            <Smoothed3LinesChart
              :xdata="oneResultData.map((i:any) => i.Age)"
              :ydata="oneResultData.map((i:any) => i['B(t)'])"
              yname="Balance"
              title="Annual changes in balance, atmin, and atmax"
              :y1data="oneResultData.map((i:any) => i['AT_min'])"
              :y1name="'AT_min'"
              :y2data="oneResultData.map((i:any) => i['AT_max'])"
              :y2name="'AT_max'"
              :xname="'Age'"
            ></Smoothed3LinesChart>
          </div>
        </div>

        <div class="function Loss" style="margin-left: 30px">
          <h1><b>Loss</b></h1>

          <div style="text-align: left">
            <img
              style="height: 90px"
              src="@/assets/formulars/loss.png"
              alt="Income functions"
            />
          </div>
          <br />

          <div class="charts" style="width: 330px; margin-left: 0">
            <SmoothedLineChart
              :xdata="oneResultData.map((i:any) => i.Age)"
              :ydata="oneResultData.map((i:any) => i['Loss(t)'])"
              title="Loss"
              xname="Age"
            ></SmoothedLineChart>
          </div>
        </div>
      </div>
      <br /><br />
      <!-- #endregion -->
    </div>
    <!-- #endregion -->

    <!-- #region Return  -->
    <br />
    <h1>Return functions</h1>
    <div class="charts2">
      <div class="function">
        <div style="text-align: left">
          <img
            style="height: 80px"
            src="@/assets/formulars/return2.png"
            alt="Price"
          />
        </div>
        <br />
        <div>
          <Formular
            :formula="[
              [
                'r<sub>t</sub>',
                'Return on the member’s balance in year t	<br>	It is a draw from a normal distribution in each year with return in each year independent from the return in each other year.',
              ],
              [
                'Inf<sub>t<sub>',
                'The level of consumer price inflation in   				year t.		<br/>	It is a draw from a normal distribution in 				each year with inflation reverting to its 				long term equilibrium level Inf_Eq',
              ],
            ]"
            :left_length="0.3"
          ></Formular>
        </div>
      </div>
      <div class="charts">
        <SmoothedLineChart
          :xdata="oneResultData.map((i:any) => i.Age)"
          :ydata="oneResultData.map((i:any) => i['r(t)'])"
          title="Return in each year"
          xname="Age"
        ></SmoothedLineChart>
      </div>
      <div class="parameters">
        <p>[γ<sub>0</sub> , γ<sub>1</sub> ...]</p>
        <el-input @keyup.enter="onSubmitOne" v-model="apiData.γ_group.value" />
        <br />
        <p>guaranteed return</p>
        <el-input @keyup.enter="onSubmitOne" v-model="apiData.ifr.value" />

        <el-button
          class="button"
          @click="onSubmitOne"
          style="margin-bottom: 50px; margin-left: 20px"
          >Perform simulation</el-button
        >
      </div>
    </div>
    <br /><br />
    <!-- #endregion -->

    <!-- #region Price  -->
    <h1>Price functions</h1>
    <div class="charts2">
      <div class="function">
        <div style="text-align: left">
          <img
            style="height: 35px"
            src="@/assets/formulars/Price.png"
            alt="Price"
          />
        </div>
        <br />
        <div>
          <Formular
            :formula="[
              ['P<sub>t</sub>', 'Price index level at the end of year t'],
              ['Inf<sub>t</sub>', 'Inflation over year t'],
            ]"
            :left_length="0.3"
          ></Formular>
        </div>
      </div>
      <div class="charts">
        <SmoothedLineChart
          :xdata="oneResultData.map((i:any) => i.Age)"
          :ydata="oneResultData.map((i:any) => i['P(t)'])"
          title="Price index in each year"
          xname="Age"
        ></SmoothedLineChart>
      </div>
      <div class="parameters">
        <p>P<sub>0</sub></p>
        <el-input
          @keyup.enter="onSubmitOne"
          v-model="apiData.Pt.value"
          :parser="(value:any) => value.replace(/\$\s?|(,*)/g, '')"
          :formatter="(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
        />
        <br />

        <el-button
          class="button"
          @click="onSubmitOne"
          style="margin-bottom: 50px; margin-left: 20px"
          >Perform simulation</el-button
        >
      </div>
    </div>
    <br /><br />
    <!-- #endregion -->

    <!-- #region Inf  -->
    <h1>Inf functions</h1>
    <div class="charts2">
      <div class="function">
        <div style="text-align: left">
          <img
            style="height: 75px"
            src="@/assets/formulars/Inf.png"
            alt="Price"
          />
        </div>
        <br />
        <div class="formular">
          <Formular
            :formula="[
              [
                'Inf<sub>t<sub>',
                'The level of consumer price inflation in   				year t.		<br/>	It is a draw from a normal distribution in 				each year with inflation reverting to its 				long term equilibrium level Inf_Eq',
              ],
              ['Inf_Eq', 'Equilibrium level of inflation'],
              ['Z<sub>t<sub>', 'a draw from the standard normal distribution'],
              [
                'σ<sub>Inf<sub>',
                '	Standard deviation of annual 					return on members balance',
              ],
              [
                'α',
                'Inflation mean reversion parameter <br> α = α<sub>1</sub> when Inf(t) > Inf_Eq <br>  α = α<sub>2</sub> when Inf(t) < Inf_Eq',
              ],
            ]"
            :left_length="0.6"
          ></Formular>
        </div>
      </div>
      <div class="charts">
        <SmoothedLineChart
          :xdata="oneResultData.map((i:any) => i.Age)"
          :ydata="oneResultData.map((i:any) => i['Inf(t)'])"
          title="Inflation in lifetime"
          xname="Age"
        ></SmoothedLineChart>
      </div>
      <div class="parameters">
        <p>σ<sub>inf</sub></p>
        <el-input @keyup.enter="onSubmitOne" v-model="apiData.σinf.value" />
        <br />
        <p>Inf_Eq</p>
        <el-input @keyup.enter="onSubmitOne" v-model="apiData.Inf_Eq.value" />
        <br />
        <p>α<sub>1</sub></p>
        <el-input @keyup.enter="onSubmitOne" v-model="apiData.α1.value" />
        <br />
        <p>α<sub>2</sub></p>
        <el-input @keyup.enter="onSubmitOne" v-model="apiData.α2.value" />
        <br />
        <p>
          moving average weight of Z
          <span style="font-size: 11px"
            >([λ<sub>1</sub>,λ<sub>2</sub>,...,λ<sub>n</sub>])</span
          >
        </p>
        <el-input @keyup.enter="onSubmitOne" v-model="apiData.Z_group.value" />
        <br />

        <el-button
          class="button"
          @click="onSubmitOne"
          style="margin-bottom: 50px; margin-left: 20px"
          >Perform simulation</el-button
        >
      </div>
    </div>
    <br /><br />
    <!-- #endregion -->

    <!-- #endregion -->
    <br /><br /><br /><br /><br />
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import axios from "axios";
import DataTransformSimpleAggregate from "@/components/echarts/boxPlot/Data Transform Simple Aggregate.vue";
import BasicBar from "@/components/echarts/barChart/Basic Bar.vue";
import SmoothedLineChart from "@/components/echarts/lineChart/Smoothed Line Chart.vue";
import Smoothed3LinesChart from "@/components/echarts/lineChart/Smoothed 3 Lines Chart.vue";
import Formular from "@/components/echarts/formular/formular.vue";
import wellbeingScatter from "./wellbeingScatter.vue";
import bequestScatter from "./bequestScatter.vue";

// #region 定义响应式变量
const apiData = reactive<any>({});
const localapiData = ref<any[]>([]);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);
const oneResultData = ref<any[]>([]);
const multiResultData = ref<any[]>([]);

// #endregion

// #region 初始化
onBeforeMount(async () => {
  try {
    loading.value = true;
    //#region 获取本地初始化数据
    let localapiDataStr =
      localStorage.getItem("default_value_for_simulation_two") || "";

    // 如果没有本地数据, 那么请求远程数据
    if (!localapiDataStr || localapiDataStr.length < 5) {
      const response = await axios.get("/api/stwo/");
      //存储本地数据
      localStorage.setItem(
        "default_value_for_simulation_two",
        JSON.stringify(response.data)
      );
      Object.assign(apiData, response.data);
      localapiData.value = response.data;
    } else {
      Object.assign(apiData, JSON.parse(localapiDataStr));
      localapiData.value = JSON.parse(localapiDataStr);
    }
    //#endregion

    //#region 获取本地onesim数据
    const localonesimData =
      localStorage.getItem("default_value_for_s2single") || "";

    //如果没有本地数据, 那么请求远程数据
    if (!localonesimData || localonesimData.length < 5) {
      const response = await axios.get("/api/stwo/onesim/", {
        params: apiData,
      });
      localStorage.setItem("default_value_for_s2single", response.data);
      oneResultData.value = JSON.parse(response.data);
    } else {
      oneResultData.value = JSON.parse(localonesimData);
    }
    //#endregion

    //#region 获取本地multisim数据
    const localmultisimData =
      localStorage.getItem("default_value_for_s2multi") || "";

    // 如果没有本地数据, 那么请求远程数据
    if (!localmultisimData || localmultisimData.length < 5) {
      const response = await axios.get("/api/stwo/multisim/", {
        params: apiData,
      });
      localStorage.setItem("default_value_for_s2multi", response.data);
      multiResultData.value = JSON.parse(response.data);
    } else {
      multiResultData.value = JSON.parse(localmultisimData);
    }
    //#endregion
  } catch (error) {
  } finally {
    loading.value = false;
  }
});
// #endregion

// #region function
// #region onSubmitOne请求一次模拟的新数据
const onSubmitOne = async () => {
  loading.value = true;
  localStorage.setItem(
    "default_value_for_simulation_two",
    JSON.stringify(apiData)
  );
  const response = await axios.get("/api/stwo/onesim/", {
    params: apiData,
  });
  localStorage.setItem("default_value_for_s2single", response.data);
  oneResultData.value = JSON.parse(response.data);
  loading.value = false;
};
// #endregion

// #region onSubmitMulti 多次模拟的结果
const onSubmitMulti = async () => {
  loading.value = true;
  if (apiData.simulationtimes.value > 4001) {
    apiData.simulationtimes.value = 4000;
  }
  loading.value = true;
  const response = await axios.get("/api/stwo/multisim/", {
    params: apiData,
  });
  const jstr = JSON.stringify(apiData);
  localStorage.setItem("default_value_for_simulation_two", jstr);
  localapiData.value = JSON.parse(jstr);
  localStorage.setItem("default_value_for_s2multi", response.data);
  multiResultData.value = JSON.parse(response.data);
  loading.value = false;
};
// #endregion

// #region barchart function
function getUniqueSortedValues<T>(
  data: T[],
  key: keyof T,
  groupSize: number
): any[] {
  // 使用 map 方法提取指定属性的值
  const allValues: T[keyof T][] = data.map((item) => item[key]);

  // 去除重复值并排序
  const uniqueSortedValues: any[] = Array.from(new Set(allValues)).sort(
    (a: any, b: any) => a - b
  );
  if (groupSize === 1) {
    return uniqueSortedValues;
  } else {
    return groupData(uniqueSortedValues, groupSize);
  }
}

function getCountListForValues<T>(
  data: T[],
  key: keyof T,
  groupSize: number
): number[] {
  const countList: number[] = [];

  const SortedList = getUniqueSortedValues(data, key, groupSize);
  if (groupSize === 1) {
    SortedList.forEach((i) => {
      const count = data.reduce((acc, item) => {
        if (item[key] === i) {
          return acc + 1;
        }
        return acc;
      }, 0);
      countList.push(count);
    });
  } else {
    SortedList.forEach((i) => {
      const count = data.reduce((acc, item) => {
        if (item[key] >= i.split("-")[0] && item[key] < i.split("-")[1]) {
          return acc + 1;
        }
        return acc;
      }, 0);
      countList.push(count);
    });
  }

  return countList;
}

function groupData(data: number[], groupSize: number): string[] {
  const groupd: string[] = [];
  const group_start: number = data[0];
  const group_end: number = data[data.length - 1];
  for (let i = group_start; i < group_end; i += groupSize) {
    groupd.push(
      `${i.toFixed(0)}-${Math.min(i + groupSize, group_end).toFixed(0)}`
    );
  }

  return groupd;
}
// #endregion

// #endregion
</script>

<style scoped>
.page {
  width: 1000px;
  margin: 0 auto; /* Center the content horizontally */
  text-align: center;
  margin-top: 50px;
}

h1 {
  text-align: left;
}

p {
  text-align: left;
}
.charts33 {
  display: flex;
  margin-top: 20px;
  .parameters {
    width: 20%;
  }
  .DataTransformSimpleAggregate {
    height: 400px;
    width: 80%;
  }
  .parameters {
    display: flex; /* 将.parameters设置为flex容器 */
    flex-direction: column; /* 垂直排列 */
    width: 20%;
  }
}

.charts2 {
  display: flex;
  margin-top: 20px;

  .function {
    margin-top: 20px;
    width: 300px;
  }
  .charts {
    width: 400px;
    height: 300px;
    margin-left: 30px;
  }
  .parameters {
    display: flex; /* 将.parameters设置为flex容器 */
    flex-direction: column; /* 垂直排列 */
    width: 20%;
    width: 200px;
    margin-left: 30px;
  }
}

.bars {
  display: flex;
  .basicbar {
    width: 500px;
    height: 400px;
  }
}

.button {
  margin-top: auto;
}
</style>
