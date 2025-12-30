<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class TempImageController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors('image')
            ]);
        }

        $image = $request->image;

        $ext = $image->getClientOriginalExtension();
        $imageName = strtotime(now()) . '.' . $ext;

        $model = new TempImage();
        $model->name = $imageName;
        $model->save();

        $originalDir = public_path('uploads/temp');
        if (!file_exists($originalDir)) {
            mkdir($originalDir, 0755, true);
        }

        $image->move($originalDir, $imageName);
        $thumbDir = public_path('uploads/temp/thumb');
        if (!file_exists($thumbDir)) {
            mkdir($thumbDir, 0755, true);
        }

        $sourcePath = $originalDir . '/' . $imageName;
        $destPath   = $thumbDir . '/' . $imageName;
        $manager = new ImageManager(Driver::class);
        $image = $manager->read($sourcePath);
        $image->coverDown(300, 300);
        $image->save($destPath);

        return response()->json([
            'status' => true,
            'data' => $model,
            'message' => 'Image uploaded successfully!',
        ]);
    }
}
