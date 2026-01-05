<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TempImage;
use Illuminate\Http\Request;
use App\Models\Members;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class MemberController extends Controller
{
    public function index()
    {
        $members = Members::orderBy('created_at', 'desc')->get();

        return response()->json([
            'status' => true,
            'data' => $members
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'job_title' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $model = new Members();
        $model->name = $request->name;
        $model->job_title = $request->job_title;
        $model->linked_in = $request->linked_in;
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
                $thumbDir = public_path('uploads/members');
                if (!File::exists($thumbDir)) {
                    File::makeDirectory($thumbDir, 0755, true);
                }

                $sourcePath = $originalDir . '/' . $tempImage->name;
                $destPath   = $thumbDir . '/' . $fileName;
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(500, 600);
                $image->save($destPath);

                $model->image = $fileName;
                $model->save();
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Members created successfully!'
        ]);
    }

    public function show($id)
    {
        $member = Members::find($id);

        if($member == null){
            return response()->json([
                'status' => false,
                'message' => 'Members not found!'
            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $member
        ]);
    }

    public function update(Request $request, $id)
    {
        $member = Members::find($id);

        if($member == null){
            return response()->json([
                'status' => false,
                'message' => 'Members not found!'
            ]);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'job_title' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $member->name = $request->name;
        $member->job_title = $request->job_title;
        $member->linked_in = $request->linked_in;
        $member->status = $request->status;
        $member->save();

        if($request->imageId > 0) {
            $oldImage = $member->image;
            $tempImage = TempImage::find($request->imageId);
            if($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = end($extArray);

                $fileName = strtotime('now').$member->id . '.' . $ext;

                $originalDir = public_path('uploads/temp');
                if (!File::exists($originalDir)) {
                    File::makeDirectory($originalDir, 0755, true);
                }
                $thumbDir = public_path('uploads/members');
                if (!File::exists($thumbDir)) {
                    File::makeDirectory($thumbDir, 0755, true);
                }

                $sourcePath = $originalDir . '/' . $tempImage->name;
                $destPath   = $thumbDir . '/' . $fileName;
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->cover(500, 600, 'center');
                $image->save($destPath, 85);

                $member->image = $fileName;
                $member->save();

                if($oldImage != null) {
                    File::delete($thumbDir . '/' . $oldImage);
                }
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Members updated successfully!'
        ]);
    }

    public function destroy($id)
    {
        $member = Members::find($id);

        if($member == null){
            return response()->json([
                'status' => false,
                'message' => 'Members not found!'
            ]);
        }

        $member->delete();

        return response()->json([
            'status' => true,
            'message' => 'Members deleted successfully!'
        ]);
    }
}
