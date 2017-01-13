<?php

namespace App\Http\Controllers;

use App\ProjectCanvasData;
use Illuminate\Http\Request;


class APICanvasController extends APIController
{
    public function project_pack_list($id)
    {
        $project_canvas_data = ProjectCanvasData::where('project_id','=',$id)->first();
        if($project_canvas_data){
            return $project_canvas_data->packs;
        }else{
            return null;
        }
    }
    public function project_bom_dict($id)
    {
        $project_canvas_data = ProjectCanvasData::where('project_id','=',$id)->first();
        if($project_canvas_data){
            return $project_canvas_data->bom_dict;
        }else{
            return null;
        }
    }
    public function project_bom_dict_std_inc($id)
    {
        $project_canvas_data = ProjectCanvasData::where('project_id','=',$id)->first();
        if($project_canvas_data){
            return $project_canvas_data->bom_dict_std_inc;
        }else{
            return null;
        }
    }
    public function set_project_pack_list($id, Request $request)
    {
        $project_canvas_data = ProjectCanvasData::find($id);
        $project_canvas_data->packs = $request->get('data');
        $project_canvas_data->save();

    }
    public function set_project_bom_dict($id, Request $request)
    {
        $project_canvas_data = ProjectCanvasData::find($id);
        $project_canvas_data->bom_dict = $request->get('data');
        $project_canvas_data->save();

    }
    public function set_project_bom_dict_std_inc($id, Request $request)
    {
        $project_canvas_data = ProjectCanvasData::find($id);
        $project_canvas_data->bom_dict_std_inc = $request->get('data');
        $project_canvas_data->save();

    }
    


}
