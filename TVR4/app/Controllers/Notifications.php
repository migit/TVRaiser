<?php namespace App\Controllers;
 
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\NotificationModel;
 
class Notifications extends ResourceController
{
    use ResponseTrait;
    
    // get all Notification 
    public function index()
    {
        $model = new NotificationModel();
        $data = $model->findAll();
        return $this->respond($data, 200);
    }


     // get single top Notification id
     public function top()
     {
        $model = new NotificationModel();
        $builder->selectMax('id');
        $query = $builder->get();
        
        $data = $model->findAll();
        return $this->respond($data, 200);
        
     }

 
    // get single Notification id
    public function show($id = null)
    {
        $uri = service('uri');
        if ($uri->getSegment(2) === 'show') {
         $id = $uri->getSegment(3);
       }

        $model = new NotificationModel();
        $data = $model->getWhere(['id' => $id])->getResult();
        if($data){
            return $this->respond($data);
        }else{
            return $this->failNotFound('No Data Found with id '.$id);
        }
    }
 
    // create a Notification
    public function create()
    {
        $uri = service('uri');
        if ($uri->getSegment(2) === 'create') {
         $id = $uri->getSegment(3);
         echo $id;
       }

        $model = new NotificationModel();
        $data = ['title' => $this->request->getPost('title'),'content' => $this->request->getPost('content')];
        $data = json_decode(file_get_contents("php://input"));
         
        $model->insert($data);
        $response = [
            'status'   => 201,
            'error'    => null,
            'messages' => [
                'success' => 'Data Saved'
            ]
        ];
         
        return $this->respondCreated($data, 201);
    }

      // create new sense data 
      public function sensor()
      {
          $uri = service('uri');
          if ($uri->getSegment(2) === 'create') {
           $id = $uri->getSegment(3);
           echo $id;
         }

         
         helper('form');

         // Checks whether the form is submitted.
         if (! $this->request->is('post')) {
             // The form is not submitted, so returns the form.
             return view('');
         }
         $post = $this->request->getPost(['title', 'body']);

        // Checks whether the submitted data passed the validation rules.
        if (! $this->validateData($post, [
            'title' => 'required|max_length[255]|min_length[3]',
            'content'  => 'required|max_length[5000]|min_length[10]',
        ])) {
            // The validation fails, so returns the form.
            return view('');
        }

        $model = model(NotificationModel::class);

        $model->save([
            'title' => $post['title'],
            'content'  => $post['content'],
        ]);

        return view('');

  /* 
          $model = new NotificationModel();
          $data = ['title' => $this->request->getPost('title'),'content' => $this->request->getPost('content')];
          $data = json_decode(file_get_contents("php://input"));
           
          $model->insert($data);
          $response = [
              'status'   => 201,
              'error'    => null,
              'messages' => [
                  'success' => 'Data Saved'
              ]
          ];
           
          return $this->respondCreated($data, 201); */
      }

 
    // update Notification
    public function update($id = null)
    {
        $model = new NotificationModel();
        $json = $this->request->getJSON();
        if($json){
            $data = [
                'title' => $json->title,
                'content' => $json->content
            ];
        }else{
            $input = $this->request->getRawInput();
            $data = [
                'title' => $input['title'],
                'content' => $input['content']
            ];
        }
        // Insert to Notification
        $model->update($id, $data);
        $response = [
            'status'   => 200,
            'error'    => null,
            'messages' => [
                'success' => 'Data Updated'
            ]
        ];
        return $this->respond($response);
    }
 
    // delete Notification
    public function delete($id = null)
    {
        $model = new NotificationModel();
        $data = $model->find($id);
        if($data){
            $model->delete($id);
            $response = [
                'status'   => 200,
                'error'    => null,
                'messages' => [
                    'success' => 'Data Deleted'
                ]
            ];
             
            return $this->respondDeleted($response);
        }else{
            return $this->failNotFound('No Data Found with id '.$id);
        }
         
    }
 
}
