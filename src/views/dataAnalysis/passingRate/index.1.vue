<template>
  <div class="passing-rate" ref="passingRate">
    <el-row :gutter="24">
      <el-col :span="4" :xs="24" :sm="24" :md="6" :lg="5">
        <div shadow="never" class="warp-card bor">
          <div class="search-input">
            <el-input placeholder="规则名检索" v-model="filterText" clearable>
            </el-input>
            <div class="search-filter-text-wrapper" v-if="filterText">
              <div class="triangleDiv-wrap">
                <span class="triangleDiv"></span>
              </div>

              <div class="wall-filter-wrap" v-clickoutside="handleClickOutside">
                <span
                  v-if="
                    !!wallList.filter(
                      item => item.name.indexOf(filterText) > -1
                    ).length
                  "
                >
                  暂无
                </span>
                <p
                  v-for="wall in wallList.filter(
                    item => item.name.indexOf(filterText) > -1
                  )"
                  :key="wall.key"
                  class="wall-filter-item"
                  @click="handleToggle(wall)"
                >
                  <i
                    class="item-icon-check"
                    :class="{ 'el-icon-check': wall.action }"
                  >
                  </i>
                  <span>
                    {{ wall.name }}
                  </span>
                  <!-- {{wallList.filter(item => (item.name === wall.name && item.aciton))}} -->
                </p>
              </div>
            </div>
          </div>

          <el-row v-loading="wallListLoading" class="wall-warp">
            <template v-for="wall in wallList">
              <el-col
                :key="wall.key"
                class="wall-item"
                :class="{ 'wall-action': wall.action }"
              >
                <div @click="handleToggle(wall)" class="name-text">
                  {{ wall.name }}
                </div>
              </el-col>
            </template>
          </el-row>
        </div>
      </el-col>
      <el-col :span="24" :xs="24" :sm="24" :md="18" :lg="19">
        <el-card shadow="never" class="warp-card">
          <div slot="header">
            <el-form
              :inline="true"
              :model="dataRangeForm"
              :rules="dataRangeFormRules"
              ref="dataRangeForm"
              label-width="100px"
            >
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="开始时间" prop="startDate">
                    <el-date-picker
                      v-model="dataRangeForm.startDate"
                      type="datetime"
                      placeholder="选择开始日期时间"
                      align="right"
                      :value-format="'yyyy-MM-dd HH:mm:ss'"
                      :picker-options="startPickerOptions"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="结束时间" prop="endDate">
                    <el-date-picker
                      v-model="dataRangeForm.endDate"
                      type="datetime"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      placeholder="选择开始日期时间"
                      align="right"
                      :picker-options="endPickerOptions"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>

                <el-col :offset="2" :span="6" style="text-align: right;">
                  <el-form-item>
                    <el-button
                      type="primary"
                      @click="submitForm('dataRangeForm')"
                    >
                      确认
                    </el-button>
                    <el-button @click="resetForm('dataRangeForm')">
                      重置
                    </el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <section class="rate-warp-sb">
            <div class="ant-card-head">
              <div class="ant-card-head-title">
                <div class="left">逾期表现</div>
                <div class="right">规则墙表现</div>
              </div>
            </div>
            <div class="ant-card-body">
              <div
                class="ant-card-grid antd-pro-pages-dashboard-workplace-style-projectGrid"
                v-for="item in resultMap"
                :key="item.key"
              >
                <div class="num">
                  <mp-num :start="0" :end="100" :speed="100" :times="10" />
                  <span style="font-size: 18px;margin-left: 5px;">
                    {{ item.label.indexOf('率') > -1 ? '%' : '' }}
                  </span>
                </div>
                <div class="text">
                  {{ item.label }}
                </div>
              </div>
            </div>
          </section>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable */
import Clickoutside from 'element-ui/src/utils/clickoutside'
export default {
  directives: { Clickoutside },
  data() {
    return {
      startPickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      endPickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      resultLoading: false,
      resultMap: [
        {
          key: 'totalNum',
          value: (v) => v.totalNum,
          label: '总订单数'
        }, {
          key: 'passNum',
           value: (v) => v.totalNum,
          label: '通过订单数'
        }, {
          key: '3',
          value: (v) => v.totalNum,
          label: '未通过订单数'
        }, {
          key: 'totalPassNum',
          value: (v) => v.totalNum,
          label: '正常还款数'
        }, {
          key: 'subNum',
          value: (v) => v.totalNum,
          label: '还款率'
        }, {
          key: '6',
          value: (v) => v.totalNum,
          label: 'xxxx率'
        }, {
          key: '7',
          value: (v) => v.totalNum,
          label: '逾期数'
        }, {
          key: '8',
          value: (v) => v.totalNum,
          label: '逾期率'
        }, {
          key: '9',
          value: (v) => v.totalNum,
          label: 'xxxx率'
        },

      ],
      resultSource: {

      },
      filterText: '',
      dataRangeForm: {
        endDate: '',
        startDate: ''
      },
      dataRangeFormRules: {
        // endDate: [
        //   { required: true, message: '结束时间必填', trigger: 'change' },
        // ],
        // startDate: [
        //   { required: true, message: '开始时间必填', trigger: 'change' },
        // ],
      },
      wallListLoading: false,
      wallList: [].map((item, indx) => ({ ...item, action: false })),
    }
  },
  methods: {
    handleClickOutside() {
      this.filterText = ''
    },
    handleToggle(wall) {
      const action = wall.action || false
      const index = this.wallList.findIndex(item => item === wall)
      this.wallList[index].action = !action
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const wallList = this.wallList.filter(item => item.action).map(item => item.key)
          if(!wallList.length) {
            this.$message.warning('左侧规则名称必选')
            return
          }
          const { startDate, endDate } = this.dataRangeForm
          await this.getRate({ wallList, startDate, endDate })

        } else {
          // this.$message({
          //   message: '规则名称必选',
          //   type: 'warning'
          // })
          return false
        }
      })
    },
    async getRate(values) {
      this.resultLoading = true
      const result = await $request.shine.avgOverdueDays({ data: values })
      this.resultLoading = false
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.wallList = this.wallList.map(item => ({ ...item, action: false }))
    }
  },
  async mounted() {
    try {
      this.wallListLoading = true
      const wallList = await $request.shine.getRuleWallList() || []
      await this.getRate({})
      this.wallList = wallList.map(item => ({ ...item, action: false }))
      this.wallListLoading = false
    } catch (error) {
      this.wallListLoading = false
    }
  }
}
/* eslint-disable */
</script>

<style lang="scss">
.passing-rate {
  margin: 20px;
  padding: 20px;
  height: calc(100% - 50px);

  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  transition: 0.3s;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  .el-form-item,
  .el-form-item--medium {
    margin-bottom: 0 !important;
  }

  // overflow: auto;

  .bor {
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    color: #303133;
    -webkit-transition: 0.3s;
    transition: 0.3s;

    .el-input__inner {
      border: none;
      height: 50px;
      font-size: 18px;
      border-bottom: 1px solid #bfcbd9;
      border-radius: none;
      // &::placeholder{
      // }
    }
  }

  .warp-card {
    position: relative;
    height: calc(100vh - 145px);
    // overflow: auto;
  }

  .wall-warp {
    height: calc(100vh - 218px);
    overflow: auto;
    margin-top: 20px;
  }
  .wall-warp::-webkit-scrollbar {
    display: none;
    position: absolute;
    right: -10px;
  }
  .wall-warp:hover::-webkit-scrollbar {
    display: inherit;
  }
  .wall-warp::-webkit-scrollbar-thumb:active {
    background: #000;
  }

  .wall-item {
    height: 50px;
    line-height: 50px;
    text-indent: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    border-bottom: 1px solid #bfcbd9;
    .name-text {
      padding-right: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .wall-action {
    color: #fff;
    background-color: #20a0ff;
  }
  .wall-item:last-child {
    border-bottom: none;
  }

  .search-input {
    position: relative;

    // .triangleDiv-wrap{
    //   display: flex;
    //   align-items: center;
    //   justify-content: center;
    // }

    // .triangleDiv{
    //   position: absolute;
    //   top: -10px;
    //   margin: 0 auto;
    //   width: 0;
    //   height: 0;
    //   border-width: 0 10px 10px;
    //   border-style: solid;
    //   border-color: transparent transparent #ebeef5;
    // }

    .search-filter-text-wrapper {
      position: absolute;
      top: 50px;
      padding: 10px;
      left: -10%;
      width: 120%;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      border: 1px solid #e4e7ed;
      box-sizing: border-box;
      background-color: #fff;
      z-index: 1;
      .wall-filter-wrap {
        max-height: 600px;
        overflow: auto;
        .wall-filter-item {
          margin: 0;
          padding: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: flex;
          span {
            flex: 1;
          }
          .item-icon-check {
            color: rgb(103, 194, 58);
            width: 20px;
            display: inline-block;
            margin-top: 4px;
            font-size: 18px;
            font-weight: 600;
          }
        }
      }
    }
  }

  .block-warp{
    margin-top: 20px;
    border: 1px solid #ebebeb;
    padding: 14px;
    border-radius: 3px;
    transition: .2s;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    text-align: center;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);

    .block{
      margin-bottom: 40px;
      border-right: 1px solid #eff2f6;
      padding: 10px 0;
      flex: 0 0 33%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;


      &:last-child{
        border-right: none;
      }
      &:nth-child(3n) {
        border-right: none;
      }

      .rate-num{
        padding: 20px 0;
        font-size: 34px;
      }
    }
  }
}
.rate-warp-sb {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0,0,0,.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: "tnum";
  position: relative;
  background: #fff;
  border-radius: 2px;
  transition: all .3s;
  .ant-card-head {
    min-height: 48px;
    margin-bottom: -1px;
    color: rgba(0,0,0,.85);
    font-weight: 500;
    font-size: 16px;
    background: transparent;
    border-bottom: 1px solid #e8e8e8;
    border-radius: 2px 2px 0 0;
    zoom: 1;
    &:before {
      display: table;
      content: "";
    }
    .ant-card-head-title {
      position: relative;
      display: flex;
      padding: 16px 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      .left {
        flex: 0 0 33.33%;
        padding-left: 10px;
        width: 3px;
      }
      .right {
        flex: 0 0 66.66%;
        text-indent: 30px;
      }
    }
  }
  .ant-card-grid {
    float: left;
    width: 33.33%;
    padding: 24px;
    border: 0;
    border-radius: 0;
    box-shadow: 1px 0 0 0 #e8e8e8, 0 1px 0 0 #e8e8e8, 1px 1px 0 0 #e8e8e8, inset 1px 0 0 0 #e8e8e8, inset 0 1px 0 0 #e8e8e8;
    transition: all .3s;
    text-align: center;

    &:hover {
      position: relative;
      z-index: 1;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15)
    }

    .text {
      margin-top: 5px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
      line-height: 22px;
    }
    .num {
      text-indent: 10px;
      overflow: hidden;
      color: rgba(0, 0, 0, 0.85);
      font-size: 30px;
      line-height: 38px;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
    }

  }
}
</style>
