<template>
     
       <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">List Users</h3>

                <div class="card-tools">
                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#addNewUserModal"> Add New <i class="fas fa-user-plus fa-fw"></i></button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Type</th>
                      <th>Registed At</th>
                      <th>Modify</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in users" :key="user.id">
                      <td>{{ user.id }}</td>
                      <td>{{ user.name }}</td>
                      <td>{{ user.email }}</td>
                      <td><span class="tag tag-success">{{ user.type | upText }}</span></td>
                      <th>{{ user.created_at | myDate }}</th>
                      <td>
                            <a href="#">
                              <i class="fa fa-edit blue"> </i>
                            </a>
                            <a href="#">
                              <i class="fa fa-trash red"> </i>
                            </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>

        <!-- Modal -->
        <div class="modal fade" id="addNewUserModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add New</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form @submit.prevent="createUser" >
                <div class="modal-body">
                  <div class="form-group">
                    <label>Username</label>
                    <input v-model="form.name" type="text" name="name" placeholder ="Name"
                      class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                    <has-error :form="form" field="name"></has-error>
                  </div>
                  <div class="form-group">
                    <label>Email</label>
                    <input v-model="form.email" type="text" name="email" placeholder ="Email"
                      class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                    <has-error :form="form" field="email"></has-error>
                  </div>

                  <div class="form-group">
                    <label>Password</label>
                    <input v-model="form.password" type="password" name="password" placeholder ="Password"
                      class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                    <has-error :form="form" field="password"></has-error>
                  </div>

                  <div class="form-group">
                    <textarea v-model="form.bio" name="bio" id="bio"
                    placeholder="Short bio for user (Optional)"
                    class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
                    <has-error :form="form" field="bio"></has-error>
                  </div>


                  <div class="form-group">
                    <select name="type" v-model="form.type" id="type" class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                        <option value="">Select User Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">Standard User</option>
                        <option value="author">Author</option>
                    </select>
                    <has-error :form="form" field="type"></has-error>
                  </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Create</button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          // Create a new form instance
          form: new Form({
            name: '',
            email: '',
            password: '',
            type: '',
            bio: '',
            photo: ''

          }), 
          users: [],
          isLoading: false,
          isPaginated: true,

          total: 0,
          sortField: 'id',
          sortOrder: 'asc',
          page: 1,
          perPage: 20,
        }
      },
      methods: {    
        loadUsers(){
          axios.get("/api/user").then(({ data }) => (this.users = data));
        }, 
        createUser(){
          this.$Progress.start();
          this.form.post('/api/user');
         // $('#addNewUserModal').modal('hide');

          Toast({
              icon: 'success',
              title: 'User created in successfully'
            });
          this.$Progress.finish();         
        }, 

        /*
        * Load async data
        */
        loadAsyncData() {
          const queriesPagination = [
              `start-index=${(this.page - 1) * this.perPage}`,
               `max-results=${this.perPage}`,
               `sort-by=${this.sortField}.${this.sortOrder}`,
          ];
          const params = queriesPagination.join('&');

          this.isLoading = true;
          const dataApi = `/api/users?${params}`;

          // Reset error messages
          // this.errorMessages = new Errors();

          axios.get(dataApi)
              .then(({data}) => {
                  this.users = [];
                  this.total = data.total;

                  this.users = data.data;

                  // // Convert api data for display table data
                  // this.items = this.transferTableData(data.items);
                  this.isLoading = false;
              })
              .catch((error) => {
                  this.isLoading = false;

                  if (error && error.response && error.response.status === 422) {
                      // Search params is invalid, do nothing
                      this.errorMessages.record(error.response.data.errors);
                      return;
                  }

                  this.users = [];
                  this.total = 0;

                  throw error;
              });
        },
      },
      mounted() {
          this.loadAsyncData();
      }
    }
</script>