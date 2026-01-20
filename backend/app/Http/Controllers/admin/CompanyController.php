<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TempImage;
use Illuminate\Http\Request;
use App\Models\Company;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class CompanyController extends Controller
{
    public function index()
    {
        return Company::first();
    }

    public function show($id)
    {
        $company = Company::find($id);

        if($company == null){
            return response()->json([
                'status' => false,
                'message' => 'Company not found!'
            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $company
        ]);
    }

    public function update(Request $request, $id)
    {
        $company = Company::find($id);

        if($company == null){
            return response()->json([
                'status' => false,
                'message' => 'Company not found!'
            ]);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'address' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $company->name = $request->name;
        $company->email = $request->email;
        $company->phone = $request->phone;
        $company->alternative_phone = $request->alternative_phone;
        $company->address = $request->address;
        $company->description = $request->description;
        $company->website = $request->website;
        $company->facebook = $request->facebook;
        $company->twitter = $request->twitter;
        $company->linkedin = $request->linkedin;
        $company->instagram = $request->instagram;
        $company->youtube = $request->youtube;
        $company->save();

        if($request->imageId > 0) {
            $oldImage = $company->image;
            $tempImage = TempImage::find($request->imageId);
            if($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = end($extArray);

                $fileName = strtotime('now').$company->id . '.' . $ext;

                $originalDir = public_path('uploads/temp');
                if (!File::exists($originalDir)) {
                    File::makeDirectory($originalDir, 0755, true);
                }
                $thumbDir = public_path('uploads/companies');
                if (!File::exists($thumbDir)) {
                    File::makeDirectory($thumbDir, 0755, true);
                }

                $sourcePath = $originalDir . '/' . $tempImage->name;
                $destPath   = $thumbDir . '/' . $fileName;
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destPath);

                $company->image = $fileName;
                $company->save();

                if($oldImage != null) {
                    File::delete($thumbDir . '/' . $oldImage);
                }
            }
        }

        if ($request->other_page_image_id > 0) {
            $oldOtherPageImage = $company->other_page_image;
            $tempImage = TempImage::find($request->other_page_image_id);

            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = end($extArray);

                $fileName = strtotime('now') . '_other_' . $company->id . '.' . $ext;

                $originalDir = public_path('uploads/temp');
                if (!File::exists($originalDir)) {
                    File::makeDirectory($originalDir, 0755, true);
                }

                $destDir = public_path('uploads/companies');
                if (!File::exists($destDir)) {
                    File::makeDirectory($destDir, 0755, true);
                }

                $sourcePath = $originalDir . '/' . $tempImage->name;
                $destPath   = $destDir . '/' . $fileName;

                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destPath);

                $company->other_page_image = $fileName;
                $company->save();

                if ($oldOtherPageImage != null) {
                    File::delete($destDir . '/' . $oldOtherPageImage);
                }
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Company updated successfully!'
        ]);
    }
}
