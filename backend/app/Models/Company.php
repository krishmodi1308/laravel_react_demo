<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $table = 'companies';

    protected $fillable = [
        'name',
        'image',
        'other_page_image',
        'address',
        'phone',
        'alternative_phone',
        'email',
        'description',
        'website',
        'facebook',
        'twitter',
        'linkedin',
        'instagram',
        'youtube',
    ];
}
