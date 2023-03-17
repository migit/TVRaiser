<?php

namespace App\Models;

use CodeIgniter\Model;

class NotificationModel extends Model
{
	protected $table      = 'notification';

	protected $primaryKey = 'id';

	protected $returnType = 'array';

	protected $allowedFields = ['id', 'title', 'content', 'date'];
}				
	