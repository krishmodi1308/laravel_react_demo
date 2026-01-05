<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TempImage;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use Illuminate\Support\Facades\File;

class TestimonialController extends Controller
{
    public function index()
    {
        $testimonials = Testimonial::orderBy('created_at', 'desc')->get();

        return response()->json([
            'status' => true,
            'data' => $testimonials
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'testimonial' => 'required',
            'citation' => 'required',
            'stars' => 'required|integer|min:1|max:5',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $model = new Testimonial();
        $model->testimonial = $request->testimonial;
        $model->citation = $request->citation;
        $model->stars = $request->stars;
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
                $thumbDir = public_path('uploads/testimonials');
                if (!File::exists($thumbDir)) {
                    File::makeDirectory($thumbDir, 0755, true);
                }

                $sourcePath = $originalDir . '/' . $tempImage->name;
                $destPath   = $thumbDir . '/' . $fileName;
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(300, 300);
                $image->save($destPath);

                $model->image = $fileName;
                $model->save();
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Testimonial created successfully!'
        ]);
    }

    public function show($id)
    {
        $testimonial = Testimonial::find($id);

        if($testimonial == null){
            return response()->json([
                'status' => false,
                'message' => 'Testimonial not found!'
            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $testimonial
        ]);
    }

    public function update(Request $request, $id)
    {
        $testimonial = Testimonial::find($id);

        if($testimonial == null){
            return response()->json([
                'status' => false,
                'message' => 'Testimonial not found!'
            ]);
        }

        $validator = Validator::make($request->all(), [
            'testimonial' => 'required',
            'citation' => 'required',
            'stars' => 'required|integer|min:1|max:5',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $testimonial->testimonial = $request->testimonial;
        $testimonial->citation = $request->citation;
        $testimonial->stars = $request->stars;
        $testimonial->status = $request->status;
        $testimonial->save();

        if($request->imageId > 0) {
            $oldImage = $testimonial->image;
            $tempImage = TempImage::find($request->imageId);
            if($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = end($extArray);

                $fileName = strtotime('now').$testimonial->id . '.' . $ext;

                $originalDir = public_path('uploads/temp');
                if (!File::exists($originalDir)) {
                    File::makeDirectory($originalDir, 0755, true);
                }
                $thumbDir = public_path('uploads/testimonials');
                if (!File::exists($thumbDir)) {
                    File::makeDirectory($thumbDir, 0755, true);
                }

                $sourcePath = $originalDir . '/' . $tempImage->name;
                $destPath   = $thumbDir . '/' . $fileName;
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(300, 300);
                $image->save($destPath);

                $testimonial->image = $fileName;
                $testimonial->save();

                if($oldImage != null) {
                    File::delete($thumbDir . '/' . $oldImage);
                }
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Testimonial updated successfully!'
        ]);
    }

    public function destroy($id)
    {
        $testimonial = Testimonial::find($id);

        if($testimonial == null){
            return response()->json([
                'status' => false,
                'message' => 'Testimonial not found!'
            ]);
        }

        $testimonial->delete();

        return response()->json([
            'status' => true,
            'message' => 'Testimonial deleted successfully!'
        ]);
    }
}
