import { Injectable } from '@angular/core';
import { CondoProject } from '../logic/condo/condo-project';
import { Block } from '../logic/condo/block';
import { Bedroom } from '../logic/modeling/bedroom';
import { Room } from '../logic/modeling/room';
import { Bathroom } from '../logic/modeling/bathroom';
import { CondoHouse } from '../logic/condo/condo-house';
import { ServerService } from './server.service';
import { Ground } from '../logic/modeling/ground';
import { Stair } from '../logic/modeling/stair';

@Injectable({
  providedIn: 'root'
})
export class CondoService {

  condoProjects: CondoProject[] = [];
  condoEditing: CondoProject;
  isAdding: boolean = false;
  isEditing: boolean = false;
  
  constructor(private server: ServerService) {
    this.condoEditing = new CondoProject("", "", "", "", "", "", "");
    this.loadCondoProjects();
    /*var condo = new CondoProject("Proyecto 1", "Limón", "Matina", "Matina", "No", "Luis Molina", "61638663");
    this.condoProjects.push(condo);

    condo = new CondoProject("Proyecto 2", "Limón", "Limón", "Limón", "No", "Michelle Alvarado", "62055706");
    this.condoProjects.push(condo);

    this.condoEditing = condo;
    this.condoEditing.blocks.push(new Block("A"));

    var ground = new CondoHouse(500);
    ground.getHouse().getFirstFloor().setWidth(21);
    ground.getHouse().getFirstFloor().setHeight(21);
    ground.getHouse().getFirstFloor().setX(0.68);
    ground.getHouse().getFirstFloor().setY(0.68);
    ground.getHouse().hasSecondFloor = true;
    ground.getHouse().getSecondFloor().setWidth(10);
    ground.getHouse().getSecondFloor().setHeight(10);
    ground.getHouse().getSecondFloor().setX(2.5);
    ground.getHouse().getSecondFloor().setY(2.5);
    var bed = new Bedroom(10, 10)
    bed.isMainBedroom = true;
    bed.floorNumber = 1;
    bed.kind = Room.MAIN_BEDROOM;
    bed.setBaseFloor(ground.getHouse().getFirstFloor());
    ground.getHouse().rooms.push(bed);
    var bed2 = new Bedroom(5, 5);
    bed2.floorNumber = 2;
    bed2.setBaseFloor(ground.getHouse().getSecondFloor());
    ground.getHouse().rooms.push(bed2);

    var bathroom = new Bathroom(1);
    bathroom.floorNumber = 1;
    bathroom.angle = 90;
    bathroom.setBaseFloor(ground.getHouse().getFirstFloor());
    ground.getHouse().rooms.push(bathroom);

    var room = new Room(3, 3, 3);
    room.floorNumber = 1;
    room.setBaseFloor(ground.getHouse().getFirstFloor());
    ground.getHouse().rooms.push(room);
    ground.getHouse().stair.kind = 1;
    this.condoEditing.blocks[0].addHouse(ground);
    this.condoEditing.blocks[0].addHouse(ground);
    this.condoEditing.blocks[0].addHouse(ground);
    this.condoEditing.blocks[0].addHouse(ground);
    this.condoEditing.blocks[0].addHouse(ground);
    this.condoEditing.blocks[0].addHouse(ground);
    this.condoEditing.blocks[0].addHouse(ground);
    this.condoEditing.blocks[0].addHouse(ground);
    this.condoEditing.blocks[0].addHouse(ground);
    this.condoEditing.blocks[0].addHouse(ground);*/
  }

  loadCondoProjects() {
    this.server.loadProjects().subscribe((data: any) => {
      data.forEach(condo => {
        var nCondo = new CondoProject(condo.name, condo.provincia, condo.canton, condo.distrito, condo.senias, condo.contactname, condo.phonenumber);
        nCondo._id = condo._id;
        condo.commonAreas.forEach(area => {
          nCondo.commonAreas[area.kind].cant = area.cant
        });
        condo.blocks.forEach(block => {
          var nBlock = new Block(block.letter);
          block.houses.forEach(element => {
            var ground = new Ground(
              element.size);
            ground._id = element._id;
            ground.getHouse().hasSecondFloor = element.house.hasSecondFloor;
            ground.getHouse().hasHotWater = element.house.hasHotWater;
            ground.getHouse().getFirstFloor().setWidth(element.house.firstFloor.width);
            ground.getHouse().getFirstFloor().setHeight(element.house.firstFloor.height);
            ground.getHouse().getFirstFloor().x = element.house.firstFloor.x;
            ground.getHouse().getFirstFloor().y = element.house.firstFloor.y;
            ground.getHouse().getSecondFloor().setWidth(element.house.secondFloor.width);
            ground.getHouse().getSecondFloor().setHeight(element.house.secondFloor.height);
            ground.getHouse().getSecondFloor().x = element.house.secondFloor.x;
            ground.getHouse().getSecondFloor().y = element.house.secondFloor.y;
            ground.getHouse().stair = new Stair(element.house.stair.kind);
            ground.getHouse().stair.x = element.house.stair.x;
            ground.getHouse().stair.y = element.house.stair.y;
            ground.getHouse().stair.angle = element.house.stair.angle;
            ground.getHouse().stair.setBaseFloor(ground.getHouse().getFirstFloor());
            element.house.rooms.forEach(room => {
              var nRoom: Room;
              switch(room.kind) {
                case Room.BEDROOM:
                case Room.MAIN_BEDROOM:
                  nRoom = new Bedroom(room.width, room.height);
                  (nRoom as Bedroom).isMainBedroom = room.isMainBedroom;
                  (nRoom as Bedroom).hasBalcony = room.hasBalcony;
                  (nRoom as Bedroom).hasBathroom = room.hasBathroom;
                  (nRoom as Bedroom).hasCloset = room.hasCloset;
                  if (room.hasCloset) {
                    (nRoom as Bedroom).closet.angle = room.closet.angle;
                    (nRoom as Bedroom).closet.x = room.closet.x;
                    (nRoom as Bedroom).closet.y = room.closet.y;
                    (nRoom as Bedroom).setBaseFloor((nRoom as Bedroom));
                  }
                  if (room.hasBalcony) {
                    (nRoom as Bedroom).balcony.setWidth(room.balcony.width);
                    (nRoom as Bedroom).balcony.setHeight(room.balcony.height);
                    (nRoom as Bedroom).balcony.x = room.balcony.x;
                    (nRoom as Bedroom).balcony.y = room.balcony.y;
                    (nRoom as Bedroom).balcony.setBaseFloor((nRoom as Bedroom));
                  }
                  if (room.hasBathroom) {
                    (nRoom as Bedroom).bathroom.x = room.bathroom.x;
                    (nRoom as Bedroom).bathroom.y = room.bathroom.y;
                    (nRoom as Bedroom).bathroom.changeAngle(room.bathroom.angle);
                    (nRoom as Bedroom).bathroom.changeAngle(room.bathroom.angle);
                    (nRoom as Bedroom).bathroom.setBaseFloor((nRoom as Bedroom));
                  }
                  break;
                case Room.COMPLETE_BATHROOM:
                case Room.SIMPLE_BATHROOM:
                  nRoom = new Bathroom(0);
                  (nRoom as Bathroom).changeAngle(room.angle);
                  break;
                default:
                  nRoom = new Room(room.width, room.height, room.kind);
              }
              nRoom.kind = room.kind;
              nRoom.floorNumber = room.floorNumber;
              nRoom.x = room.x;
              nRoom.y = room.y;
              ground.getHouse().rooms.push(nRoom);
            });
            nBlock.addHouse(ground);
          });
          nCondo.blocks.push(nBlock);
          });
          this.condoProjects.push(nCondo);
      })
    });
  }
}
