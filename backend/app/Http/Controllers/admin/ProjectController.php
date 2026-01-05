<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class ProjectController extends Controller
{
    // This method will return all projects
    public function index()
    {
        $projects = Project::orderBy('created_at', 'desc')->get();

        return response()->json([
            'status' => true,
            'data' => $projects
        ]);
    }

    public function store(Request $request)
    {
        $request->merge(['slug' => Str::slug($request->slug)]);
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:projects,slug',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
            ]);
        }

        $project = new Project();
        $project->title = $request->title;
        $project->slug = Str::slug($request->slug);
        $project->short_desc = $request->short_desc;
        $project->content = $request->content;
        $project->construction_type = $request->construction_type;
        $project->sector = $request->sector;
        $project->location = $request->location;
        $project->status = $request->status;
        $project->save();

        if($request->imageId > 0) {
            $tempImage = TempImage::find($request->imageId);
            if($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = end($extArray);

                $fileName = strtotime('now').$project->id . '.' . $ext;

                $originalDir = public_path('uploads/temp');
                if (!File::exists($originalDir)) {
                    File::makeDirectory($originalDir, 0755, true);
                }
                $thumbDir = public_path('uploads/projects/small');
                if (!File::exists($thumbDir)) {
                    File::makeDirectory($thumbDir, 0755, true);
                }
                $largeDir = public_path('uploads/projects/large');
                if (!File::exists($largeDir)) {
                    File::makeDirectory($largeDir, 0755, true);
                }

                $sourcePath = $originalDir . '/' . $tempImage->name;
                $destPath   = $thumbDir . '/' . $fileName;
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(500, 600);
                $image->save($destPath);

                $destPath   = $largeDir . '/' . $fileName;
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destPath);

                $project->image = $fileName;
                $project->save();
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Project added successfully!',
        ]);
    }

    public function show($id)
    {
        $project = Project::find($id);

        if($project == null){
            return response()->json([
                'status' => false,
                'message' => 'Project not found!'
            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $project
        ]);
    }

    public function update(Request $request, $id)
    {
        $project = Project::find($id);

        if($project == null){
            return response()->json([
                'status' => false,
                'message' => 'Project not found!'
            ]);
        }

        $request->merge(['slug' => Str::slug($request->slug)]);
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:projects,slug,'.$id.',id'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $project->title = $request->title;
        $project->short_desc = $request->short_desc;
        $project->slug = Str::slug($request->slug);
        $project->content = $request->content;
        $project->status = $request->status;
        $project->save();

        if($request->imageId > 0) {
            $oldImage = $project->image;
            $tempImage = TempImage::find($request->imageId);
            if($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = end($extArray);

                $fileName = strtotime('now').$project->id . '.' . $ext;

                $originalDir = public_path('uploads/temp');
                if (!File::exists($originalDir)) {
                    File::makeDirectory($originalDir, 0755, true);
                }
                $thumbDir = public_path('uploads/projects/small');
                if (!File::exists($thumbDir)) {
                    File::makeDirectory($thumbDir, 0755, true);
                }
                $largeDir = public_path('uploads/projects/large');
                if (!File::exists($largeDir)) {
                    File::makeDirectory($largeDir, 0755, true);
                }

                $sourcePath = $originalDir . '/' . $tempImage->name;
                $destPath   = $thumbDir . '/' . $fileName;
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(500, 600);
                $image->save($destPath);

                $destPath   = $largeDir . '/' . $fileName;
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destPath);

                $project->image = $fileName;
                $project->save();

                if($oldImage != null) {
                    File::delete($largeDir . '/' . $oldImage);
                    File::delete($thumbDir . '/' . $oldImage);
                }
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Project updated successfully!'
        ]);
    }

    public function destroy($id)
    {
        $project = Project::find($id);

        if($project == null){
            return response()->json([
                'status' => false,
                'message' => 'Project not found!'
            ]);
        }

        $project->delete();

        return response()->json([
            'status' => true,
            'message' => 'Project deleted successfully!'
        ]);
    }
}
