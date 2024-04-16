using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class CambiaNombreDeAlgunasTablas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AgendaServiciosDelProfesional_Agendas_AgendaId",
                table: "AgendaServiciosDelProfesional");

            migrationBuilder.DropForeignKey(
                name: "FK_AgendaServiciosDelProfesional_ServiciosDelProfesional_ServicioDelProfesionalId",
                table: "AgendaServiciosDelProfesional");

            migrationBuilder.DropForeignKey(
                name: "FK_FranjaHoraria_Agendas_AgendaId",
                table: "FranjaHoraria");

            migrationBuilder.DropForeignKey(
                name: "FK_Servicios_CategoriaDeServicio_CategoriaDeServicioId",
                table: "Servicios");

            migrationBuilder.DropForeignKey(
                name: "FK_ServiciosDelProfesional_Profesionales_ProfesionalId",
                table: "ServiciosDelProfesional");

            migrationBuilder.DropForeignKey(
                name: "FK_ServiciosDelProfesional_Servicios_ServicioId",
                table: "ServiciosDelProfesional");

            migrationBuilder.DropForeignKey(
                name: "FK_Turnos_ServiciosDelProfesional_ServicioProfesionalId",
                table: "Turnos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ServiciosDelProfesional",
                table: "ServiciosDelProfesional");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FranjaHoraria",
                table: "FranjaHoraria");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CategoriaDeServicio",
                table: "CategoriaDeServicio");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AgendaServiciosDelProfesional",
                table: "AgendaServiciosDelProfesional");

            migrationBuilder.RenameTable(
                name: "ServiciosDelProfesional",
                newName: "ServiciosProfesionales");

            migrationBuilder.RenameTable(
                name: "FranjaHoraria",
                newName: "AgendaFranjasHorarias");

            migrationBuilder.RenameTable(
                name: "CategoriaDeServicio",
                newName: "CategoriasDeServicios");

            migrationBuilder.RenameTable(
                name: "AgendaServiciosDelProfesional",
                newName: "AgendasServiciosProfesionales");

            migrationBuilder.RenameIndex(
                name: "IX_ServiciosDelProfesional_ServicioId",
                table: "ServiciosProfesionales",
                newName: "IX_ServiciosProfesionales_ServicioId");

            migrationBuilder.RenameIndex(
                name: "IX_ServiciosDelProfesional_ProfesionalId_ServicioId",
                table: "ServiciosProfesionales",
                newName: "IX_ServiciosProfesionales_ProfesionalId_ServicioId");

            migrationBuilder.RenameIndex(
                name: "IX_FranjaHoraria_AgendaId",
                table: "AgendaFranjasHorarias",
                newName: "IX_AgendaFranjasHorarias_AgendaId");

            migrationBuilder.RenameIndex(
                name: "IX_AgendaServiciosDelProfesional_ServicioDelProfesionalId",
                table: "AgendasServiciosProfesionales",
                newName: "IX_AgendasServiciosProfesionales_ServicioDelProfesionalId");

            migrationBuilder.RenameIndex(
                name: "IX_AgendaServiciosDelProfesional_AgendaId",
                table: "AgendasServiciosProfesionales",
                newName: "IX_AgendasServiciosProfesionales_AgendaId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ServiciosProfesionales",
                table: "ServiciosProfesionales",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AgendaFranjasHorarias",
                table: "AgendaFranjasHorarias",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CategoriasDeServicios",
                table: "CategoriasDeServicios",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AgendasServiciosProfesionales",
                table: "AgendasServiciosProfesionales",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AgendaFranjasHorarias_Agendas_AgendaId",
                table: "AgendaFranjasHorarias",
                column: "AgendaId",
                principalTable: "Agendas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AgendasServiciosProfesionales_Agendas_AgendaId",
                table: "AgendasServiciosProfesionales",
                column: "AgendaId",
                principalTable: "Agendas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AgendasServiciosProfesionales_ServiciosProfesionales_ServicioDelProfesionalId",
                table: "AgendasServiciosProfesionales",
                column: "ServicioDelProfesionalId",
                principalTable: "ServiciosProfesionales",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Servicios_CategoriasDeServicios_CategoriaDeServicioId",
                table: "Servicios",
                column: "CategoriaDeServicioId",
                principalTable: "CategoriasDeServicios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ServiciosProfesionales_Profesionales_ProfesionalId",
                table: "ServiciosProfesionales",
                column: "ProfesionalId",
                principalTable: "Profesionales",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_ServiciosProfesionales_Servicios_ServicioId",
                table: "ServiciosProfesionales",
                column: "ServicioId",
                principalTable: "Servicios",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Turnos_ServiciosProfesionales_ServicioProfesionalId",
                table: "Turnos",
                column: "ServicioProfesionalId",
                principalTable: "ServiciosProfesionales",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AgendaFranjasHorarias_Agendas_AgendaId",
                table: "AgendaFranjasHorarias");

            migrationBuilder.DropForeignKey(
                name: "FK_AgendasServiciosProfesionales_Agendas_AgendaId",
                table: "AgendasServiciosProfesionales");

            migrationBuilder.DropForeignKey(
                name: "FK_AgendasServiciosProfesionales_ServiciosProfesionales_ServicioDelProfesionalId",
                table: "AgendasServiciosProfesionales");

            migrationBuilder.DropForeignKey(
                name: "FK_Servicios_CategoriasDeServicios_CategoriaDeServicioId",
                table: "Servicios");

            migrationBuilder.DropForeignKey(
                name: "FK_ServiciosProfesionales_Profesionales_ProfesionalId",
                table: "ServiciosProfesionales");

            migrationBuilder.DropForeignKey(
                name: "FK_ServiciosProfesionales_Servicios_ServicioId",
                table: "ServiciosProfesionales");

            migrationBuilder.DropForeignKey(
                name: "FK_Turnos_ServiciosProfesionales_ServicioProfesionalId",
                table: "Turnos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ServiciosProfesionales",
                table: "ServiciosProfesionales");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CategoriasDeServicios",
                table: "CategoriasDeServicios");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AgendasServiciosProfesionales",
                table: "AgendasServiciosProfesionales");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AgendaFranjasHorarias",
                table: "AgendaFranjasHorarias");

            migrationBuilder.RenameTable(
                name: "ServiciosProfesionales",
                newName: "ServiciosDelProfesional");

            migrationBuilder.RenameTable(
                name: "CategoriasDeServicios",
                newName: "CategoriaDeServicio");

            migrationBuilder.RenameTable(
                name: "AgendasServiciosProfesionales",
                newName: "AgendaServiciosDelProfesional");

            migrationBuilder.RenameTable(
                name: "AgendaFranjasHorarias",
                newName: "FranjaHoraria");

            migrationBuilder.RenameIndex(
                name: "IX_ServiciosProfesionales_ServicioId",
                table: "ServiciosDelProfesional",
                newName: "IX_ServiciosDelProfesional_ServicioId");

            migrationBuilder.RenameIndex(
                name: "IX_ServiciosProfesionales_ProfesionalId_ServicioId",
                table: "ServiciosDelProfesional",
                newName: "IX_ServiciosDelProfesional_ProfesionalId_ServicioId");

            migrationBuilder.RenameIndex(
                name: "IX_AgendasServiciosProfesionales_ServicioDelProfesionalId",
                table: "AgendaServiciosDelProfesional",
                newName: "IX_AgendaServiciosDelProfesional_ServicioDelProfesionalId");

            migrationBuilder.RenameIndex(
                name: "IX_AgendasServiciosProfesionales_AgendaId",
                table: "AgendaServiciosDelProfesional",
                newName: "IX_AgendaServiciosDelProfesional_AgendaId");

            migrationBuilder.RenameIndex(
                name: "IX_AgendaFranjasHorarias_AgendaId",
                table: "FranjaHoraria",
                newName: "IX_FranjaHoraria_AgendaId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ServiciosDelProfesional",
                table: "ServiciosDelProfesional",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CategoriaDeServicio",
                table: "CategoriaDeServicio",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AgendaServiciosDelProfesional",
                table: "AgendaServiciosDelProfesional",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FranjaHoraria",
                table: "FranjaHoraria",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AgendaServiciosDelProfesional_Agendas_AgendaId",
                table: "AgendaServiciosDelProfesional",
                column: "AgendaId",
                principalTable: "Agendas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AgendaServiciosDelProfesional_ServiciosDelProfesional_ServicioDelProfesionalId",
                table: "AgendaServiciosDelProfesional",
                column: "ServicioDelProfesionalId",
                principalTable: "ServiciosDelProfesional",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FranjaHoraria_Agendas_AgendaId",
                table: "FranjaHoraria",
                column: "AgendaId",
                principalTable: "Agendas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Servicios_CategoriaDeServicio_CategoriaDeServicioId",
                table: "Servicios",
                column: "CategoriaDeServicioId",
                principalTable: "CategoriaDeServicio",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ServiciosDelProfesional_Profesionales_ProfesionalId",
                table: "ServiciosDelProfesional",
                column: "ProfesionalId",
                principalTable: "Profesionales",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ServiciosDelProfesional_Servicios_ServicioId",
                table: "ServiciosDelProfesional",
                column: "ServicioId",
                principalTable: "Servicios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Turnos_ServiciosDelProfesional_ServicioProfesionalId",
                table: "Turnos",
                column: "ServicioProfesionalId",
                principalTable: "ServiciosDelProfesional",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
