<template>
  <div>
  <el-container>
    <el-main style="position: relative;border-left:1px solid #28acc6;">
      <div style="border:1px solid #28acc6;height: 40px;border-left-width:0px;border-bottom-width:0px;">
        <el-row style="padding-top: 8px;">
          <span class="btn_def" style="margin-left:20px;" @click="handleCreate">+ 增加</span>
          <span class="btn_def" style="margin-left:5px;">- 删除</span>
          <span v-if="!indent" class="btn_indent"  @click="indent=true"> >>缩进</span>
          <span v-if="indent" class="btn_indent"  @click="indent=false"> <<缩进</span>
        </el-row>
      </div>
      <div style="border:1px solid #28acc6;min-height: 800px;border-left-width:0px;border-bottom-width:0px;padding: 20px;">
        <div style="border:2px solid #28acc6;">
          <el-table
            ref="singleTable"
            :data="tableData"
            highlight-current-row
            @current-change="handleCurrentChange"
            style="width: 100%">
            <el-table-column
              type="index"
              label="增仓顺序"
              width="100"
              align="left">
            </el-table-column>
            <el-table-column
              property="num"
              label="品种代码"
              width="120"
              align="left">
            </el-table-column>
            <el-table-column
              property="name"
              label="品种名称"
              width="120"
              align="left">
            </el-table-column>
            <el-table-column
              property="name"
              label="风险因素"
              width="120"
              align="left">
            </el-table-column>
            <el-table-column
              property="name"
              label="产品帐套"
              width="120"
              align="left">
            </el-table-column>
            <el-table-column
              property="percent"
              label="风险操作类型"
              min-width="180"
              align="left">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div style="position: absolute;top:290px;right:0px;">
        <span class="fix_btn">固定收益<span class="point">12</span></span>
        <span class="fix_btn" style="border-top-width:0px;">股票<span class="point">3</span></span>
      </div>
      <!--增加弹窗-->
      <el-dialog v-if="false" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="180px" style="width: 400px; margin-left:50px;">
          <el-form-item label="加入风险品种：" prop="type">
            <input class="input_line" style="display: inline-block;" value="000001"/>
            <span style="margin-left: 10px;">平安银行</span>
          </el-form-item>
          <el-form-item label="风险因素：" prop="type">
            <el-select v-model="temp.type" class="filter-item" placeholder="风险因素" style="width: 120px;top:-4px;" size="mini">
              <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
            </el-select>
          </el-form-item>
          <el-form-item label="风险操作类型：" prop="type">
            <el-select v-model="temp.type" class="filter-item" placeholder="增仓" style="width: 120px;top:-4px;" size="mini">
              <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
          <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
        </div>
      </el-dialog>
      <!--删除弹窗-->
      <el-dialog v-if="true" :title="textMap2[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="180px" style="width: 400px; margin-left:50px;">
          <el-form-item label="*删除风险品种：" prop="type">
            <input class="input_line" style="display: inline-block;" value="000001"/>
            <span style="margin-left: 20px;">平安银行</span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
          <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
        </div>
      </el-dialog>
    </el-main>
    <el-aside width="200px" :class="{'width_change':indent}" style="border:1px solid #28acc6;border-left-width:0px;border-bottom-width:0px;">

      <div style="width:100%;height: 60px;line-height: 70px;padding: 0 20px;">
        <span style="width:50%;text-align: center;display: inline-block;float: left;">品种代码</span>
        <span style="width:50%;text-align: center;display: inline-block; float: right;">品种名称</span>
      </div>
      <div style="margin: 0 30px;border:1px solid #28acc6; text-align: center;height: 200px;line-height: 100px;">
        品种信息
      </div>
    </el-aside>
  </el-container>
  </div>
</template>
<script>

const calendarTypeOptions = [
  { key: 'P', display_name: '平安银行' },
  { key: 'C', display_name: '中国银行' },
  { key: 'G', display_name: '工商银行' },
  { key: 'J', display_name: '建设银行' }
]
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'index7',
  data() {
    return {
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        date:'',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: '增加'
      },
      textMap2: {
        update: 'Edit',
        create: '删除'
      },
      dialogPvVisible: false,
      calendarTypeOptions,
      indent:true,
      tableData: [{
        num:'312001',
        ave:'24.3',
        act:'36.1',
        profit:'11.8',
        percent: '11%',
        name: '三三零',
        order: '01'
      }, {
        num:'312001',
        ave:'10.9',
        act:'12.3',
        profit:'1.4',
        percent: '50%',
        name: '三二零',
        order: '02'
      }],
    }
  },
  methods: {
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-container{

}
.el-aside {
  color: #333;
}

.el-main {
  color: #333;
  padding: 0!important;
}
.btn_def{
  border:1px solid #28acc6;
  background-color: #fff;
  background:#fff ;
  color:#333;
  font-size:12px;
  padding: 5px 12px;
  cursor: pointer;

}
.btn_def:hover{
  border:1px solid #28acc6;
  background-color:#fff ;
  background:#fff ;
  color:#333;
  box-shadow: rgba(0,0,0,0.15) 3px 3px 3px;
}
.fix_btn{
  display:block;
  width: 54px;
  box-sizing: border-box;
  padding: 10px 10px 10px 15px;
  border:1px solid #28acc6;
  background: #fff;
  cursor: pointer;
  position: relative;
  font-size:12px;
}
.point{
  background: red;
  border-radius: 10px;
  width: 18px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  color: #fff;
  position: absolute;
  top: 50%;
  left: 0;
  margin-left: -9px;
  margin-top: -9px;
}
.btn_indent{
  position: absolute;
  right: 10px;
  cursor: pointer;
  margin-top: 2px;
}
.width_change{
  width: 0px!important;

}

.input_line{
  border:none;
  border-bottom:1px solid #ccc;
  width:80px!important;
  text-align: center;

}
.el-form-item{
  margin-bottom: 5px;
}
</style>

