<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TempImage;
use Illuminate\Http\Request;
use App\Models\Slider;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class SliderController extends Controller
{
    public function index()
    {
        $sliders = Slider::orderBy('created_at', 'desc')->get();

        return response()->json([
            'status' => true,
            'data' => $sliders
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $model = new Slider();
        $model->title = $request->title;
        $model->description = $request->description;
        $model->status = $request->status;
        $model->save();

        if($request->imageId > 0) {
            $tempImage = TempImage::find($request->imageId);
            if($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = end($extArray);

                $fileName = strtotime('now').$model->id . '.' . $ext;

                $originalDir = public_path('uploads/temp');
                if (!File::exists($originalDir)) {
                    File::makeDirectory($originalDir, 0755, true);
                }
                $largeDir = public_path('uploads/sliders');
                if (!File::exists($largeDir)) {
                    File::makeDirectory($largeDir, 0755, true);
                }

                $sourcePath = $originalDir . '/' . $tempImage->name;
                $destPath   = $largeDir . '/' . $fileName;
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destPath);

                $model->image = $fileName;
                $model->save();
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Slider created successfully!'
        ]);
    }

    public function show($id)
    {
        $slider = Slider::find($id);

        if($slider == null){
            return response()->json([
                'status' => false,
                'message' => 'Slider not found!'
            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $slider
        ]);
    }

    public function update(Request $request, $id)
    {
        $slider = Slider::find($id);

        if($slider == null){
            return response()->json([
                'status' => false,
                'message' => 'Slider not found!'
            ]);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $slider->title = $request->title;
        $slider->description = $request->description;
        $slider->status = $request->status;
        $slider->save();

        if($request->imageId > 0) {
            $oldImage = $slider->image;
            $tempImage = TempImage::find($request->imageId);
            if($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = end($extArray);

                $fileName = strtotime('now').$slider->id . '.' . $ext;

                $originalDir = public_path('uploads/temp');
                if (!File::exists($originalDir)) {
                    File::makeDirectory($originalDir, 0755, true);
                }
                $largeDir = public_path('uploads/sliders');
                if (!File::exists($largeDir)) {
                    File::makeDirectory($largeDir, 0755, true);
                }

                $sourcePath = $originalDir . '/' . $tempImage->name;
                $destPath   = $largeDir . '/' . $fileName;
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destPath);

                $slider->image = $fileName;
                $slider->save();

                if($oldImage != null) {
                    File::delete($largeDir . '/' . $oldImage);
                }
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Slider updated successfully!'
        ]);
    }

    public function destroy($id)
    {
        $slider = Slider::find($id);

        if($slider == null){
            return response()->json([
                'status' => false,
                'message' => 'Slider not found!'
            ]);
        }

        $slider->delete();

        return response()->json([
            'status' => true,
            'message' => 'Slider deleted successfully!'
        ]);
    }

    public function getAllSliders()
    {
        $sliders = Slider::where('status', 1)->orderBy('created_at', 'desc')->get();

        return response()->json([
            'status' => true,
            'data' => $sliders
        ]);
    }
}
