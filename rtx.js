let canvas = document.getElementById("gamescreen")
const GAME_WIDTH=canvas.getAttribute('width')
const GAME_HEIGHT=canvas.getAttribute('height')
let ctx = canvas.getContext('2d')
const lightsourcevector={x:0,y:-1/Math.sqrt(2),z:-1/Math.sqrt(2)}
let planets=[]
let count=0
class Planet{
    constructor(radius,position){
        this.radius=radius
        this.position=position
        this.colorRat={r:0,g:0,b:1}
    }
    hit(pos,entryVector){
        let output={intersect:false,intersection:0}
        let dist=pndiff3D(pos,this.position)
        let mag=Math.sqrt(Math.pow(dist.x,2)+Math.pow(dist.y,2)+Math.pow(dist.z,2))
        if(mag<=this.radius){
            output.intersect=true
            if(dot_product(unit_vector(dist),unit_vector(entryVector))>-1 && dot_product(unit_vector(dist),unit_vector(entryVector))<1){
                let planeDef={r:unit_vector(dist),l:unit_vector(cross_product(unit_vector(cross_product(dist,entryVector)),dist))}
                let pdist={r:mag,l:0}
                let pvector={r:dot_product(planeDef.r,entryVector),l:dot_product(planeDef.l,entryVector)}
                var a=pvector.r/pvector.l
                var b=pdist.r
                let pintersection={
                    r:((-2*Math.pow(a,2)*b-a*Math.sqrt(4*(Math.pow(this.radius,2)*Math.pow(a,2)-Math.pow(b,2)+Math.pow(this.radius,2))))/(2*(Math.pow(a,2)+1)))+b,
                    l:(-2*a*b-Math.sqrt(4*(Math.pow(this.radius,2)*Math.pow(a,2)-Math.pow(b,2)+Math.pow(this.radius,2))))/(2*(Math.pow(a,2)+1))
                }
                output.intersection={
                    x:planeDef.r.x*pintersection.r+planeDef.l.x*pintersection.l,
                    y:planeDef.r.y*pintersection.r+planeDef.l.y*pintersection.l,
                    z:planeDef.r.z*pintersection.r+planeDef.l.z*pintersection.l
                }
            }
            else if(dot_product(unit_vector(dist),unit_vector(entryVector))==-1){
                output.intersection={
                    x:unit_vector(dist).x*this.radius,
                    y:unit_vector(dist).y*this.radius,
                    z:unit_vector(dist).z*this.radius
                }
            }
            else{
                output.intersection={
                    x:-unit_vector(dist).x*this.radius,
                    y:-unit_vector(dist).y*this.radius,
                    z:-unit_vector(dist).z*this.radius
                }
            }
        }
        return output
    }
    shade(vector){
        let mag=Math.sqrt(Math.pow(vector.x,2)+Math.pow(vector.y,2)+Math.pow(vector.z,2))
        if(mag==0){
            return 'error'
        }
        let shadePercentage=dot_product(unit_vector(vector),unit_vector(lightsourcevector))
        if(shadePercentage<0)shadePercentage=0;
        let color='#'+letters(basebasher(this.colorRat.r*shadePercentage*255,16,2))+letters(basebasher(this.colorRat.g*shadePercentage*255,16,2))+letters(basebasher(this.colorRat.b*shadePercentage*255,16,2))
        return color
    }
}
class Background{
    constructor(depth){
        this.depth=depth
    }
    hit(pos,entryVector){
        let output={intersect:false,intersection:{x:0,y:0}}
        if(pos.z>=this.depth){
            output.intersect=true
            if(entryVector.x>0){
                var a=entryVector.z/entryVector.x
                var b=pos.z-pos.x*a
                output.intersection.x=(this.depth-b)/a
            }
            else{
                output.intersection.x=pos.x
            }
            if(entryVector.y>0){
                var a=entryVector.z/entryVector.y
                var b=pos.z-pos.y*a
                output.intersection.y=(this.depth-b)/a
            }
            else{
                output.intersection.y=pos.y
            }
        }
        return output
    }
    grid(int){
        if(Math.abs(int.x)%100<=5 || Math.abs(int.y)%100<=5){
            return '#000'
        }
        else{
            return '#fff'
        }
    }
}
function beam(pos,speed){
    count++
    let id=count
    for(var i=0;i<planets.length;i++){
        PID=planets[i].hit(pos,speed)
        if(PID.intersect){
            return planets[i].shade(PID.intersection)
        }
    }
    BID=background.hit(pos,speed)
    if(BID.intersect){
        return background.grid(BID.intersection)
    }
    newpos={
        x:pos.x+speed.x,
        y:pos.y+speed.y,
        z:pos.z+speed.z
    }
    // if(count>599){
    //     debugger
    // }
    return beam(newpos,speed)
}
function dot_product(vector1,vector2){
    return vector1.x*vector2.x+vector1.y*vector2.y+vector1.z*vector2.z
}
function basebasher(dec,base,dignum){
    var digits=[]
    x=true
    while(x){
        digits.push(dec%base)
        dec=Math.floor(dec/base)
        if(dec==0){
            x=false
        }
    }
    if(digits.length<dignum){
        while(dignum>digits.length){
            digits.push(0)
        }
    }
    return digits.reverse()
}
function letters(arr){
    let alpha="0123456789abcdefghijklmnopqrstuvwxyz"
    nstr=''
    for(i=0;i<arr.length;i++){
        nstr=nstr+alpha[arr[i]]
    }
    return nstr
}
function unit_vector(a){
    let a_mag=Math.sqrt(Math.pow(a.x,2)+Math.pow(a.y,2)+Math.pow(a.z,2))
    let a_hat={
        x:a.x/a_mag,
        y:a.y/a_mag,
        z:a.z/a_mag
    }
    return a_hat
}
function cross_product(a,b){
    let final={
        x:a.y*b.z-a.z*b.y,
        y:a.z*b.x-a.x*b.z,
        z:a.x*b.y-a.y*b.x
    }
    return final
}
function pndiff3D(p1,p2){
    dist={x:p1.x-p2.x,y:p1.y-p2.y,z:p1.z-p2.z}
    return dist
}
planets.push(new Planet(100,{x:0,y:0,z:300}))
background = new Background(600)
for(var i=0;i<GAME_WIDTH;i++){
    for(var j=0;j<GAME_HEIGHT;j++){
        ctx.fillStyle=beam({x:i-GAME_WIDTH/2,y:j-GAME_HEIGHT/2,z:0},{x:0,y:0,z:1})
        ctx.fillRect(i,j,1,1)
    }
}
