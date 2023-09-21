<template>
  <div class="manage">
    <el-dialog
      title="提示"
      :before-close="handleClose"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <!-- 用户表单信息 -->
      <el-form
        :rules="rules"
        ref="form"
        :model="form"
        label-width="100px"
        inline
      >
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button @click="handleAdd" type="primary"> + 新增 </el-button>
      <!-- 搜索 -->
      <el-form :model="userForm" :inline="true">
        <el-form-item>
          <el-input v-model="userForm.name" placeholder="请输入名称">
          </el-input>
        </el-form-item>

        <el-form-item
          ><el-button @click="onSubmit" type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-table">
      <el-table :data="tableData" height="90%" style="width: 100%" stripe>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            {{ scope.row.sex === 1 ? "男" : "女" }}
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="birth" label="出生日期"></el-table-column>

        <el-table-column prop="addr" label="地址"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">
              编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >
              删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination
          @current-change="handlePage"
          layout="prev, pager, next"
          :total="this.total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { addUser, getUser, editUser, delUser } from "../api";
import axios from "axios";
import { Axis } from "echarts";
export default {
  name: "User",
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      total: 0, //当前总条数
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      methodType: 0,
      pageData: {
        page: 1,
        limit: 10,
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
          },
        ],
        age: [{ required: true, message: "请输入年龄" }],

        sex: [{ required: true, message: "请选择性别" }],

        birth: [{ required: true, message: "请选择日期" }],

        addr: [{ required: true, message: "请填写地址" }],
      },
      userForm: {
        name: "",
      },
    };
  },
  methods: {
    //提交表单
    submit() {
      this.$refs.form.validate((valid) => {
        this.dialogVisible = false;
        // console.log("valid---------------", valid);
        if (valid) {
          // console.log("this.form", this.form);
          if (this.methodType === 0) {
            addUser(this.form).then(() => {
              this.getList();
            });
          }
          if (this.methodType === 1) {
            editUser(this.form).then(() => {
              this.getList();
            });
          }
          this.cancel();
        }
      });
    },
    handleClose() {
      console.log(this.$refs.form);
      this.$refs.form.resetFields();
    },
    cancel() {
      this.handleClose();
      this.dialogVisible = false;
    },
    handleAdd() {
      this.methodType = 0;
      this.dialogVisible = true;
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser({ id: row.id }).then(() => {
            this.$message({ type: "success", message: "删除成功!" });
            this.getList();
          });
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消删除" });
        });
    },
    handleEdit(row) {
      this.methodType = 1;
      this.dialogVisible = true;
      //深拷贝
      this.form = JSON.parse(JSON.stringify(row));
    },
    getList() {
      //
      getUser({ params: { ...this.userForm, ...this.pageData } }).then(
        ({ data }) => {
          console.log("用户数据", data);
          this.tableData = data.list;
          this.total = data.count || 0;
        }
      );
    },
    //选页码
    handlePage(a) {
      console.log(a);
      this.pageData.page = a;
      this.getList();
    },
    onSubmit() {
      this.getList();
    },
  },
  mounted() {
    this.getList();
    // axios.get("/api/user/gerUser").then((res) => {
    //   console.log(res.data, "user");
    // });
  },
};
</script>

<style lang="less" scoped>
.manage {
  height: 90%;
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .common-table {
    height: calc(100% - 62px);
    position: relative;
    .pager {
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
}
</style>
