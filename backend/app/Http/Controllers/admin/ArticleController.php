<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TempImage;
use Illuminate\Http\Request;
use App\Models\Article;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::orderBy('created_at', 'desc')->get();

        return response()->json([
            'status' => true,
            'data' => $articles
        ]);
    }

    public function store(Request $request)
    {
        $request->merge(['slug' => Str::slug($request->slug)]);
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:articles,slug',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $model = new Article();
        $model->title = $request->title;
        $model->author = $request->author;
        $model->slug = Str::slug($request->slug);
        $model->content = $request->content;
        $model->status = $request->status;
        $model->save();

        if($request->imageId > 0) {
            $tempImage = TempImage::find($request->imageId);
            if($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = end($extArray);

                $fileName = strtotime('now').$model->id . '.' . $ext;

                $originalDir = public_path('uploads/temp');
                if (!file_exists($originalDir)) {
                    mkdir($originalDir, 0755, true);
                }
                $thumbDir = public_path('uploads/articles/small');
                if (!file_exists($thumbDir)) {
                    mkdir($thumbDir, 0755, true);
                }
                $largeDir = public_path('uploads/articles/large');
                if (!file_exists($largeDir)) {
                    mkdir($largeDir, 0755, true);
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

                $model->image = $fileName;
                $model->save();
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Article created successfully!'
        ]);
    }

    public function show($id)
    {
        $article = Article::find($id);

        if($article == null){
            return response()->json([
                'status' => false,
                'message' => 'Article not found!'
            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $article
        ]);
    }

    public function update(Request $request, $id)
    {
        $article = Article::find($id);

        if($article == null){
            return response()->json([
                'status' => false,
                'message' => 'Article not found!'
            ]);
        }

        $request->merge(['slug' => Str::slug($request->slug)]);
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:articles,slug,'.$id.',id'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $article->title = $request->title;
        $article->author = $request->author;
        $article->slug = Str::slug($request->slug);
        $article->content = $request->content;
        $article->status = $request->status;
        $article->save();

        if($request->imageId > 0) {
            $oldImage = $article->image;
            $tempImage = TempImage::find($request->imageId);
            if($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = end($extArray);

                $fileName = strtotime('now').$article->id . '.' . $ext;

                $originalDir = public_path('uploads/temp');
                if (!file_exists($originalDir)) {
                    mkdir($originalDir, 0755, true);
                }
                $thumbDir = public_path('uploads/articles/small');
                if (!file_exists($thumbDir)) {
                    mkdir($thumbDir, 0755, true);
                }
                $largeDir = public_path('uploads/articles/large');
                if (!file_exists($largeDir)) {
                    mkdir($largeDir, 0755, true);
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

                $article->image = $fileName;
                $article->save();

                if($oldImage != null) {
                    File::delete($largeDir . '/' . $oldImage);
                    File::delete($thumbDir . '/' . $oldImage);
                }
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Article updated successfully!'
        ]);
    }

    public function destroy($id)
    {
        $article = Article::find($id);

        if($article == null){
            return response()->json([
                'status' => false,
                'message' => 'Article not found!'
            ]);
        }

        $article->delete();

        return response()->json([
            'status' => true,
            'message' => 'Article deleted successfully!'
        ]);
    }
}
