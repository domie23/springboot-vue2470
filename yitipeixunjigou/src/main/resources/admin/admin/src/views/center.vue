<template>
  <div>
    <el-form
      class="detail-form-content"
      ref="ruleForm"
      :model="ruleForm"
      label-width="auto"
    >  
     <el-row>
                    <el-col :span="12">
           <el-form-item v-if="flag=='jiaoshi'"  label='教师名称' prop="jiaoshiName">
               <el-input v-model="ruleForm.jiaoshiName"  placeholder='教师名称' clearable></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="12">
           <el-form-item v-if="flag=='jiaoshi'"  label='教师手机号' prop="jiaoshiPhone">
               <el-input v-model="ruleForm.jiaoshiPhone"  placeholder='教师手机号' clearable></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="12">
           <el-form-item v-if="flag=='jiaoshi'"  label='教师身份证号' prop="jiaoshiIdNumber">
               <el-input v-model="ruleForm.jiaoshiIdNumber"  placeholder='教师身份证号' clearable></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="12">
             <el-form-item v-if="flag=='jiaoshi'" label='教师头像' prop="jiaoshiPhoto">
                 <file-upload
                         tip="点击上传照片"
                         action="file/upload"
                         :limit="3"
                         :multiple="true"
                         :fileUrls="ruleForm.jiaoshiPhoto?$base.url+ruleForm.jiaoshiPhoto:''"
                         @change="jiaoshiPhotoUploadChange"
                 ></file-upload>
             </el-form-item>
         </el-col>
         <el-col :span="12">
           <el-form-item v-if="flag=='jiaoshi'"  label='教师邮箱' prop="jiaoshiEmail">
               <el-input v-model="ruleForm.jiaoshiEmail"  placeholder='教师邮箱' clearable></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="12">
           <el-form-item v-if="flag=='yonghu'"  label='学员名称' prop="yonghuName">
               <el-input v-model="ruleForm.yonghuName"  placeholder='学员名称' clearable></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="12">
           <el-form-item v-if="flag=='yonghu'"  label='学员手机号' prop="yonghuPhone">
               <el-input v-model="ruleForm.yonghuPhone"  placeholder='学员手机号' clearable></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="12">
           <el-form-item v-if="flag=='yonghu'"  label='学员身份证号' prop="yonghuIdNumber">
               <el-input v-model="ruleForm.yonghuIdNumber"  placeholder='学员身份证号' clearable></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="12">
             <el-form-item v-if="flag=='yonghu'" label='学员头像' prop="yonghuPhoto">
                 <file-upload
                         tip="点击上传照片"
                         action="file/upload"
                         :limit="3"
                         :multiple="true"
                         :fileUrls="ruleForm.yonghuPhoto?$base.url+ruleForm.yonghuPhoto:''"
                         @change="yonghuPhotoUploadChange"
                 ></file-upload>
             </el-form-item>
         </el-col>
         <el-col :span="12">
           <el-form-item v-if="flag=='yonghu'"  label='学员邮箱' prop="yonghuEmail">
               <el-input v-model="ruleForm.yonghuEmail"  placeholder='学员邮箱' clearable></el-input>
           </el-form-item>
         </el-col>
         <el-form-item v-if="flag=='users'" label="用户名" prop="username">
             <el-input v-model="ruleForm.username"
                       placeholder="用户名"></el-input>
         </el-form-item>
         <el-col :span="12">
             <el-form-item v-if="flag!='users' &&( 1==2|| flag=='yonghu'
|| flag=='jiaoshi')"  label="性别" prop="sexTypes">
                 <el-select v-model="ruleForm.sexTypes" placeholder="请选择性别">
                     <el-option
                             v-for="(item,index) in sexTypesOptions"
                             v-bind:key="item.codeIndex"
                             :label="item.indexName"
                             :value="item.codeIndex">
                     </el-option>
                 </el-select>
             </el-form-item>
         </el-col>
         <el-col :span="24">
             <el-form-item>
                 <el-button type="primary" @click="onUpdateHandler">修 改</el-button>
             </el-form-item>
         </el-col>
     </el-row>
    </el-form>
  </div>
</template>
<script>
// 数字，邮件，手机，url，身份证校验
import { isNumber,isIntNumer,isEmail,isMobile,isPhone,isURL,checkIdCard } from "@/utils/validate";

export default {
  data() {
    return {
        ruleForm: {},
        flag: '',
        usersFlag: false,
        // sexTypesOptions : [],
// 注册表 学员
    // 注册的类型字段 学员
        // 性别
        sexTypesOptions : [],
// 注册表 教师
    // 注册的类型字段 教师
        // 性别
        sexTypesOptions : [],
    };
  },
  mounted() {
    //获取当前登录用户的信息
    var table = this.$storage.get("sessionTable");
    this.sessionTable = this.$storage.get("sessionTable");
    this.role = this.$storage.get("role");
    if (this.role != "管理员"){
    }

    this.flag = table;
    this.$http({
      url: `${this.$storage.get("sessionTable")}/session`,
      method: "get"
    }).then(({ data }) => {
      if (data && data.code === 0) {
        this.ruleForm = data.data;
// 注册表 学员
// 注册表 教师
      } else {
        this.$message.error(data.msg);
      }
    });

// 注册表 学员 的级联表
// 注册表 教师 的级联表

      this.$http({
          url: `dictionary/page?page=1&limit=100&sort=&order=&dicCode=sex_types`,
          method: "get"
      }).then(({ data }) => {
          if (data && data.code === 0) {
              this.sexTypesOptions = data.data.list;
          } else {
              this.$message.error(data.msg);
          }
      });
  },
  methods: {
    chongzhi() {
      this.$router.replace({ path: "/pay" });
    },
    tixian() {
      let _this=this;
      this.$confirm(`确定要提现么?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
      }).then(() => {
          _this.ruleForm.newMoney=0;
          _this.$http({
              url: `${this.$storage.get("sessionTable")}/update`,
              method: "post",
              data: this.ruleForm
          }).then(({ data }) => {
              if (data && data.code === 0) {
                  _this.$message({message: "提现成功",type: "success",duration: 1500,onClose: () => {}});
              } else {this.$message.error(data.msg);}
          });
      });
    },
    jiaoshiPhotoUploadChange(fileUrls) {
        this.ruleForm.jiaoshiPhoto = fileUrls;
    },
    yonghuPhotoUploadChange(fileUrls) {
        this.ruleForm.yonghuPhoto = fileUrls;
    },


    onUpdateHandler() {
                         if((!this.ruleForm.jiaoshiName)&& 'jiaoshi'==this.flag){
                             this.$message.error('教师名称不能为空');
                             return
                         }

                             if( 'jiaoshi' ==this.flag && this.ruleForm.jiaoshiPhone&&(!isMobile(this.ruleForm.jiaoshiPhone))){
                                 this.$message.error(`手机应输入手机格式`);
                                 return
                             }
                         if((!this.ruleForm.jiaoshiIdNumber)&& 'jiaoshi'==this.flag){
                             this.$message.error('教师身份证号不能为空');
                             return
                         }

                         if((!this.ruleForm.jiaoshiPhoto)&& 'jiaoshi'==this.flag){
                             this.$message.error('教师头像不能为空');
                             return
                         }

                             if( 'jiaoshi' ==this.flag && this.ruleForm.jiaoshiEmail&&(!isEmail(this.ruleForm.jiaoshiEmail))){
                                 this.$message.error(`邮箱应输入邮箱格式`);
                                 return
                             }
                         if((!this.ruleForm.yonghuName)&& 'yonghu'==this.flag){
                             this.$message.error('学员名称不能为空');
                             return
                         }

                             if( 'yonghu' ==this.flag && this.ruleForm.yonghuPhone&&(!isMobile(this.ruleForm.yonghuPhone))){
                                 this.$message.error(`手机应输入手机格式`);
                                 return
                             }
                         if((!this.ruleForm.yonghuIdNumber)&& 'yonghu'==this.flag){
                             this.$message.error('学员身份证号不能为空');
                             return
                         }

                         if((!this.ruleForm.yonghuPhoto)&& 'yonghu'==this.flag){
                             this.$message.error('学员头像不能为空');
                             return
                         }

                             if( 'yonghu' ==this.flag && this.ruleForm.yonghuEmail&&(!isEmail(this.ruleForm.yonghuEmail))){
                                 this.$message.error(`邮箱应输入邮箱格式`);
                                 return
                             }
        if((!this.ruleForm.sexTypes) && (1==2|| this.flag=='yonghu'
|| this.flag=='jiaoshi')){
            this.$message.error('性别不能为空');
            return
        }
      if('users'==this.flag && this.ruleForm.username.trim().length<1) {
        this.$message.error(`用户名不能为空`);
        return	
      }
      this.$http({
        url: `${this.$storage.get("sessionTable")}/update`,
        method: "post",
        data: this.ruleForm
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.$message({
            message: "修改信息成功",
            type: "success",
            duration: 1500,
            onClose: () => {
            }
          });
        } else {
          this.$message.error(data.msg);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
