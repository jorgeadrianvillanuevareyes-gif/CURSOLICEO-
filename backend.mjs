import {createClient} from 'https://esm.sh/@supabase/supabase-js@2.95.3';
export const client=createClient('https://bveqazokitzafuyjxqkt.supabase.co','sb_publishable_-HKIdEiJ1j0fMALozw7Ckg_qBzt9jVN');
const val=(f,k)=>String(f.get(k)||'').trim();
let currentUser=null;
export const current=()=>currentUser;
export async function login(email,password,signup=false){const {data,error}=signup?await client.auth.signUp({email,password,options:{emailRedirectTo:location.href.split('#')[0]}}):await client.auth.signInWithPassword({email,password});if(error)throw Error(error.message);return data;}
export async function logout(){await client.auth.signOut();currentUser=null;location.reload()}
export async function getData(){const {data:{user},error:e}=await client.auth.getUser();if(e||!user){currentUser=null;return null;}currentUser=user;const {data:p,error:pe}=await client.from('liceo_profiles').select('*').eq('id',user.id).maybeSingle();if(pe)throw pe;
let posts=[],codes=[],faculty=[];
if(p?.approved){const r=await client.from('liceo_posts').select('*,liceo_files(id,filename,storage_path)').order('created_at',{ascending:false});if(r.error)throw r.error;posts=(r.data||[]).map(x=>({id:x.id,course:x.course,subject:x.subject_name||'',kind:x.kind,title:x.title,description:x.content,created:x.created_at,authorId:x.author_id,authorName:x.author_name,due:x.due,filename:x.liceo_files?.[0]?.filename||'',fileId:x.liceo_files?.[0]?.id||''}));}
if(p?.role==='admin'){const [c,f]=await Promise.all([client.from('liceo_invites').select('*').order('created_at',{ascending:false}),client.from('liceo_profiles').select('*').order('created_at',{ascending:false})]);if(c.error)throw c.error;if(f.error)throw f.error;codes=(c.data||[]).map(x=>({id:x.id,email:x.email,course:x.course,usedBy:x.use_count>0,revoked:x.revoked,expires:x.expires_at}));faculty=(f.data||[]).filter(x=>x.id!==user.id&&x.requested_role==='teacher').map(x=>({id:x.id,name:x.full_name,subjects:x.subjects,role:x.role}));}
return {email:user.email,userId:user.id,profile:p?{name:p.full_name,age:p.birth_date?new Date().getFullYear()-Number(p.birth_date.slice(0,4)):'',birthdate:p.birth_date,birthplace:p.birthplace,course:p.course,requestedRole:p.requested_role,subjects:p.subjects,bio:p.bio}:null,admitted:!!p?.approved,admin:p?.role==='admin',teacher:p?.approved&&['teacher','admin'].includes(p.role),posts,codes,faculty};}
const expect=({error})=>{if(error)throw Error(error.message)};
export async function send(f,action){const user=currentUser;if(!user)throw Error('Primero inicia sesión');
if(action==='register'){
 let birth=val(f,'birthdate');if(!birth){const age=Number(val(f,'age'));if(!age||age<5||age>120)throw Error('Edad inválida');birth=(new Date().getFullYear()-age)+'-01-01';}
 expect(await client.rpc('liceo_create_profile',{p_name:val(f,'name'),p_birth:birth,p_birthplace:val(f,'birthplace'),p_course:val(f,'course'),p_requested_role:val(f,'role'),p_subjects:val(f,'subjects'),p_bio:val(f,'bio')}));
 const code=val(f,'accessCode');if(code){const {data,error}=await client.rpc('liceo_redeem_code',{p_code:code});if(error)throw Error(error.message);if(!data)throw Error('Clave incorrecta, vencida o asignada a otro correo');}return {success:true};}
if(action==='create_code'){const bytes=crypto.getRandomValues(new Uint8Array(18));const code='LICEO-'+Array.from(bytes,x=>x.toString(16).padStart(2,'0')).join('').toUpperCase();expect(await client.rpc('liceo_admin_issue_invite',{p_code:code,p_email:val(f,'email'),p_course:val(f,'course'),p_days:30}));return {email:val(f,'email'),course:val(f,'course'),code};}
if(action==='revoke_code'){expect(await client.rpc('liceo_admin_revoke_invite',{p_id:val(f,'id')}));return {success:true};}
if(['approve','revoke'].includes(action)){expect(await client.rpc('liceo_admin_set_role',{p_user:val(f,'id'),p_role:action==='approve'?'teacher':'student',p_approved:action==='approve'}));return {success:true};}
if(['publish','edit'].includes(action)){
const payload={title:val(f,'title'),content:val(f,'description'),kind:val(f,'kind'),course:val(f,'course'),subject_name:val(f,'subject'),due:val(f,'due')||null};
let id=val(f,'id');if(action==='edit'){expect(await client.from('liceo_posts').update(payload).eq('id',id));}
else{payload.author_id=user.id;payload.author_name=(await getData()).profile?.name||'Profesor LICEO';const {data,error}=await client.from('liceo_posts').insert(payload).select('id').single();if(error)throw Error(error.message);id=data.id;}
const file=f.get('file');if(file instanceof File&&file.size){if(file.size>20*1024*1024)throw Error('El archivo excede 20 MB');if(/\.(html?|js|svg|exe|bat|sh)$/i.test(file.name))throw Error('Formato de archivo no permitido');let path=`${user.id}/${id}/${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g,'_')}`;expect(await client.storage.from('liceo-materiales').upload(path,file,{upsert:false}));const ins=await client.from('liceo_files').insert({post_id:id,uploader_id:user.id,storage_path:path,filename:file.name});if(ins.error){await client.storage.from('liceo-materiales').remove([path]);throw Error(ins.error.message);}}
return {success:true};}
if(['delete','remove_attachment'].includes(action)){
const id=val(f,'id');const {data:files,error}=await client.from('liceo_files').select('*').eq('post_id',id);if(error)throw Error(error.message);
if(files?.length){const paths=files.map(x=>x.storage_path);expect(await client.storage.from('liceo-materiales').remove(paths));expect(await client.from('liceo_files').delete().eq('post_id',id));}
if(action==='delete')expect(await client.from('liceo_posts').delete().eq('id',id));return {success:true};}
throw Error('Acción no compatible');}
export async function download(postId){const r=await client.from('liceo_files').select('filename,storage_path').eq('post_id',postId).maybeSingle();if(r.error)throw Error(r.error.message);if(!r.data)throw Error('Archivo no disponible');const d=await client.storage.from('liceo-materiales').createSignedUrl(r.data.storage_path,60);if(d.error)throw Error(d.error.message);const a=document.createElement('a');a.href=d.data.signedUrl;a.target='_blank';a.rel='noopener';document.body.append(a);a.click();a.remove();}
